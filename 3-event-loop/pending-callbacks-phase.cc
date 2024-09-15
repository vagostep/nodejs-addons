#include <napi.h>
#include <uv.h>

struct WorkData {
    Napi::FunctionReference callback; // Almacena el callback de JavaScript
    int result; // Almacena el resultado de la tarea
};

// Esta función se ejecuta en el hilo de trabajo
void DoWork(uv_work_t* request) {
    // Do something
}

// Esta función se ejecuta en el hilo principal después de que se completa el trabajo
void AfterWork(uv_work_t* request, int /* status */) {
    WorkData* data = static_cast<WorkData*>(request->data);
    
    Napi::Env env = data->callback.Env();
    Napi::HandleScope scope(env);

    // Llama al callback de JavaScript con el resultado
    data->callback.MakeCallback(
        Napi::Object::New(env),
        { Napi::String::New(env, "Pending callbacks event triggered!") }
    );

    // Limpiar
    delete data; // Liberar la memoria
    delete request; // Liberar el objeto de trabajo
}

Napi::Value AddToPendingCallbacksQueue(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    // Verificar que se pase un callback
    if (!info[0].IsFunction()) {
        Napi::TypeError::New(env, "Callback must be a function").ThrowAsJavaScriptException();
        return env.Null();
    }

    // Crear datos de trabajo
    WorkData* data = new WorkData;
    data->callback = Napi::Persistent(info[0].As<Napi::Function>()); // Almacenar el callback de forma persistente

    // Crear un objeto de trabajo
    uv_work_t* request = new uv_work_t;
    request->data = data;

    // Encolar el trabajo
    uv_queue_work(uv_default_loop(), request, DoWork, AfterWork);

    return Napi::String::New(env, "Work started");
}