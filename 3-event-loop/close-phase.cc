#include <napi.h>
#include <uv.h>

struct CloseQueueData {
    uv_async_t async; // Usar uv_async_t para manejar el cierre
    Napi::FunctionReference callback; // Almacena el callback de JavaScript
};

// Este callback se ejecuta cuando el evento async es manejado
void CloseCallback(uv_async_t* handle) {
    printf("CloseCallback\n");
    
}

// Callback para uv_close
void CloseHandle(uv_handle_t* handle) {

    CloseQueueData* data = static_cast<CloseQueueData*>(handle->data);

    // Ejecutar el callback de JavaScript
    Napi::Env env = data->callback.Env();
    Napi::HandleScope scope(env);

    data->callback.MakeCallback(
        Napi::Object::New(env),
        { Napi::String::New(env, "Close queue event triggered!") }
    );

    // Limpiar y liberar la memoria
    data->callback.Reset(); // Limpiar la referencia
    delete data; // Liberar la memoria
}

Napi::Value AddToCloseQueue(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    // Verificar que se pase un callback
    if (!info[0].IsFunction()) {
        Napi::TypeError::New(env, "Callback must be a function").ThrowAsJavaScriptException();
        return env.Null();
    }

    Napi::Function callback = info[0].As<Napi::Function>();

    // Crear datos de cierre
    CloseQueueData* data = new CloseQueueData;
    data->callback = Napi::Persistent(callback); // Almacenar el callback de forma persistente

    // Inicializar el async
    uv_async_init(uv_default_loop(), &data->async, CloseCallback);
    data->async.data = data; // Almacenar datos en el handle

    // Cerrar el handle y ejecutar el callback en la fase de cierre
    uv_close(reinterpret_cast<uv_handle_t*>(&data->async), CloseHandle);

    return Napi::String::New(env, "Close queue started");
}
