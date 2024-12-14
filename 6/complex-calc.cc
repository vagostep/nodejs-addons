#include <napi.h>

int fibonacciLogic(int n) {
    if (n <= 1) return n;
    return fibonacciLogic(n - 1) + fibonacciLogic(n - 2);
}

Napi::Value Fibonacci(const Napi::CallbackInfo &info)
{

  Napi::Env env = info.Env();

  if (info.Length() < 1 || !info[0].IsNumber())
  {
    Napi::TypeError::New(env, "Number expected").ThrowAsJavaScriptException();
    return Napi::Number::New(env, 0);
  }

  int n = info[0].As<Napi::Number>().Int32Value();
  int result = fibonacciLogic(n);
  return Napi::Number::New(env, result);
}

// Inicializar el módulo
Napi::Object Init(Napi::Env env, Napi::Object exports)
{
  exports.Set(Napi::String::New(env, "fibonacci"), Napi::Function::New(env, Fibonacci));
  return exports;
}

NODE_API_MODULE(addon, Init);