#include <napi.h>
#include <thread>

struct AsyncWorkData {
    Napi::FunctionReference callback;
    int64_t result;
};

Napi::Value LongLoopSync(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  int64_t result = 0;
  for (int64_t i = 0; i < 1e9; ++i) {
    result += i;
  }
  return Napi::BigInt::New(env, result);
}

void LongLoopAsyncWork(napi_env env, void* data) {
  AsyncWorkData* asyncData = static_cast<AsyncWorkData*>(data);

  int64_t result = 0;
  for (int64_t i = 0; i < 1e9; ++i) {
    result += i;
  }

  asyncData->result = result;
}

void CompleteLongLoopAsyncWork(napi_env env, napi_status status, void* data) {
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

Napi::Value StartLongLoopAsyncWork(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
     if (info.Length() < 1 || !info[0].IsFunction()) {
        Napi::TypeError::New(env, "Expected a callback function").ThrowAsJavaScriptException();
        return env.Null();
    }

    Napi::Function callback = info[0].As<Napi::Function>();

    // Crear los datos de la tarea asincrónica
    AsyncWorkData* asyncData = new AsyncWorkData();
    asyncData->callback = Napi::Persistent(callback);

    // Crear la tarea asincrónica
    napi_value resource_name;
    napi_create_string_utf8(env, "LongLoopAsyncWork", NAPI_AUTO_LENGTH, &resource_name);

    //
    napi_async_work work;
    napi_create_async_work(env, nullptr, resource_name, LongLoopAsyncWork, CompleteLongLoopAsyncWork, asyncData, &work);
  
    // Colocar la tarea en el event loop
    napi_queue_async_work(env, work);

    return env.Undefined();
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "longLoop"), Napi::Function::New(env, StartLongLoopAsyncWork));
  exports.Set(Napi::String::New(env, "longLoopSync"), Napi::Function::New(env, LongLoopSync));
  return exports;
}

NODE_API_MODULE(addon, Init)