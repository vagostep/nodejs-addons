#include <napi.h>
#include <uv.h>

struct AsyncWorkData {
    Napi::FunctionReference callback;
    int64_t result;
};

void CompleteAsyncTask(napi_env env, napi_status status, void* data) {
    Napi::Env napiEnv = Napi::Env(env);
    Napi::HandleScope scope(napiEnv);
    AsyncWorkData* asyncData = static_cast<AsyncWorkData*>(data);
    
    if (status != napi_ok) {
        asyncData->callback.MakeCallback(
            Napi::Object::New(napiEnv), 
            { Napi::String::New(napiEnv, "Async work failed"), napiEnv.Null() }
        );
    } else {
        asyncData->callback.MakeCallback(
            Napi::Object::New(napiEnv), 
            { napiEnv.Null(), Napi::BigInt::New(napiEnv, asyncData->result) }
        );
    }

    delete asyncData;
}

void AsyncTask(napi_env env, void* data) {
  AsyncWorkData* asyncData = static_cast<AsyncWorkData*>(data);

  asyncData->result = 1;
}

Napi::Value AddToPendingCallbacksQueue(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    // Verificar que se pase un callback
    if (!info[0].IsFunction()) {
        Napi::TypeError::New(env, "Callback must be a function").ThrowAsJavaScriptException();
        return env.Null();
    }

    // Crear los datos de la tarea asincrónica
    AsyncWorkData* asyncData = new AsyncWorkData();
    asyncData->callback = Napi::Persistent(info[0].As<Napi::Function>());  // Almacenar el callback de forma persistente
    napi_value resource_name;
    napi_create_string_utf8(env, "PendingCallbacks", NAPI_AUTO_LENGTH, &resource_name);
    // Crea la tarea asíncrona
    napi_async_work work;
    napi_create_async_work(env, nullptr, resource_name, AsyncTask, CompleteAsyncTask, asyncData, &work);
  
    // Colocar la tarea en el event loop
    napi_queue_async_work(env, work);

    return Napi::String::New(env, "Work started");
}