#include <napi.h>
#include "init-phase.h"

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set(Napi::String::New(env, "addToTimerQueue"), Napi::Function::New(env, AddToTimerQueue));
    exports.Set(Napi::String::New(env, "addToCheckQueue"), Napi::Function::New(env, AddToCheckQueue));
    exports.Set(Napi::String::New(env, "addToPendingCallbacksQueue"), Napi::Function::New(env, AddToPendingCallbacksQueue));
    return exports;
}

NODE_API_MODULE(myaddon, Init)