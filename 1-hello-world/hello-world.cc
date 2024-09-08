#include <napi.h>

// Función simple que retorna un saludo
Napi::String SayHello(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    return Napi::String::New(env, "Hello from addon!");
}

// Inicializar el módulo
Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set(Napi::String::New(env, "sayHello"), Napi::Function::New(env, SayHello));
    return exports;
}

NODE_API_MODULE(addon, Init)