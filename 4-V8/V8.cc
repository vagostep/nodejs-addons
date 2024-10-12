#include <napi.h>
#include <v8.h>
#include <fstream>
#include <sstream>
#include <string>

using namespace v8;

Napi::Value LoadingExternalFiles(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    if (info.Length() < 1 || !info[0].IsString()) {
        Napi::TypeError::New(env, "You need to provide a path to file").ThrowAsJavaScriptException();
        return env.Null();
    }

    // Obtener el nombre del archivo desde el argumento
    std::string filename = info[0].As<Napi::String>().Utf8Value();

    // Leer el contenido del archivo
    std::ifstream file(filename);
    if (!file.is_open()) {
        Napi::Error::New(env, "No se pudo abrir el archivo").ThrowAsJavaScriptException();
        return Napi::String();
    }

    std::stringstream buffer;
    buffer << file.rdbuf();  // Lee el contenido del archivo
    file.close();

    try {
        // Ejecutando el Script usando la instancia de V8 de nuestro proceso NodeJs
        Napi::Value result = env.RunScript(buffer.str());
        
        return Napi::Boolean::New(env, true);

    } catch (int error) {
        Napi::TypeError::New(env, "Error running V8 script!").ThrowAsJavaScriptException();
        return env.Null();
    }

}

// Inicializa el addon
Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set(Napi::String::New(env, "loadingExternalFiles"), Napi::Function::New(env, LoadingExternalFiles));
    return exports;
}

NODE_API_MODULE(v8_instance_example, Init)