#include <napi.h>
#include <v8.h>

using namespace v8;

Napi::String CalculateRetirement(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    // Obtener el objeto JavaScript
    Napi::Object obj = info[0].As<Napi::Object>();

    // Acceder a las propiedades de la operación
    int salary = obj.Get(Napi::String::New(env, "salary")).As<Napi::Number>().Int32Value();
    int age = obj.Get(Napi::String::New(env, "age")).As<Napi::Number>().Int32Value();

    // Crear el script que realiza la operación
    std::string script = R"(
        function calculate(a, b) {
            return ((65 - a) * 12) * b;
        }
        calculate(%d, %d);
    )";

    // Formatear el script con los valores
    char buffer[120];
    snprintf(buffer, sizeof(buffer), script.c_str(), age, salary);
    Napi::Value result = env.RunScript(buffer);
    std::string str = std::to_string(result.As<Napi::Number>().Int32Value());

    // Devolver el HTML como un string
    return Napi::String::New(env, str);
}

// Inicializa el addon
Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set(Napi::String::New(env, "calculateRetirement"), Napi::Function::New(env, CalculateRetirement));
    return exports;
}

NODE_API_MODULE(v8_instance_example, Init)