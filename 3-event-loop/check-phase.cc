#include <napi.h>
#include <uv.h>
#include "init-phase.h"

struct CheckData {
    uv_check_t check;
    Napi::FunctionReference callback; // Almacena el callback de JavaScript
};

void CheckCallback(uv_check_t* handle) {
    CheckData* data = static_cast<CheckData*>(handle->data);

    // Ejecutar el callback de JavaScript
    Napi::Env env = data->callback.Env();
    Napi::HandleScope scope(env);

    data->callback.MakeCallback(
        Napi::Object::New(env),
        { Napi::String::New(env, "Check event triggered!") }
    );

    // Detener el check y liberar la memoria
    uv_check_stop(handle); // Detener el check
    uv_close((uv_handle_t*)handle, [](uv_handle_t* handle) {
        CheckData* data = static_cast<CheckData*>(handle->data);
        data->callback.Reset(); // Limpiar la referencia
        delete data; // Liberar la memoria
    });
}

Napi::Value AddToCheckPhase(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    // Verificar que se pase un callback
    if (!info[0].IsFunction()) {
        Napi::TypeError::New(env, "Callback must be a function").ThrowAsJavaScriptException();
        return env.Null();
    }

     // Obtener el callback de la primera posición
    Napi::Function callback = info[0].As<Napi::Function>();

    // Crear datos de verificación
    CheckData* data = new CheckData;
    data->callback = Napi::Persistent(callback); // Almacenar el callback de forma persistente

    // Inicializar el check
    uv_check_init(uv_default_loop(), &data->check);
    data->check.data = data; // Almacenar datos en el handle
    uv_check_start(&data->check, CheckCallback); // Iniciar el check

    return Napi::String::New(env, "Check started");
}