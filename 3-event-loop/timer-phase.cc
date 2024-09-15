#include <napi.h>
#include <uv.h>
#include "init-phase.h"

struct TimerData {
    uv_timer_t timer;
    Napi::FunctionReference callback; // Almacena el callback de JavaScript
};

void TimerCallback(uv_timer_t* handle) {
    TimerData* data = static_cast<TimerData*>(handle->data);
    
    // Ejecutar el callback de JavaScript
    Napi::Env env = data->callback.Env();
    Napi::HandleScope scope(env);
    
    data->callback.MakeCallback(
        Napi::Object::New(env),
        { Napi::String::New(env, "Timer expired!") });
    
    // Cerrar el temporizador
    uv_close((uv_handle_t*)handle, [](uv_handle_t* handle) {
        TimerData* data = static_cast<TimerData*>(handle->data);
        data->callback.Reset(); // Limpiar la referencia
        delete data; // Liberar la memoria
    });
}

Napi::Value AddToTimerPhase(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    // Verificar que se pase un callback
    if (!info[0].IsFunction()) {
        Napi::TypeError::New(env, "Callback must be a function").ThrowAsJavaScriptException();
        return env.Null();
    }

    // Verificar que se pase un callback
    if (!info[1].IsNumber()) {
        Napi::TypeError::New(env, "You must provide a number for timeout").ThrowAsJavaScriptException();
        return env.Null();
    }

    Napi::Function callback = info[0].As<Napi::Function>();
    Napi::Number timeout = info[1].As<Napi::Number>();
    uint64_t time = timeout.Int64Value();

    // Crear datos del temporizador
    TimerData* data = new TimerData;
    data->callback = Napi::Persistent(callback); // Almacenar el callback de forma persistente

    // Inicializar el temporizador
    uv_timer_init(uv_default_loop(), &data->timer);
    data->timer.data = data; // Almacenar datos en el handle
    uv_timer_start(&data->timer, TimerCallback, time, 0); // 2000 ms, sin repetición

    return Napi::String::New(env, "Timer started");
}