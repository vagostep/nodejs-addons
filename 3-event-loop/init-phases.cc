#include <napi.h>
#include "init-phase.h"

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set(Napi::String::New(env, "addToTimerPhase"), Napi::Function::New(env, AddToTimerPhase));
    exports.Set(Napi::String::New(env, "addToCheckPhase"), Napi::Function::New(env, AddToCheckPhase));
    exports.Set(Napi::String::New(env, "addToCloseQueue"), Napi::Function::New(env, AddToCloseQueue));
    exports.Set(Napi::String::New(env, "addToPendingCallbacksQueue"), Napi::Function::New(env, AddToPendingCallbacksQueue));
    return exports;
}

NODE_API_MODULE(myaddon, Init)