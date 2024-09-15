#ifndef INIT_PHASE_H
#define INIT_PHASE_H

#include <napi.h>

Napi::Value AddToTimerPhase(const Napi::CallbackInfo& info);
Napi::Value AddToCheckPhase(const Napi::CallbackInfo& info);
Napi::Value AddToCloseQueue(const Napi::CallbackInfo& info);
Napi::Value AddToPendingCallbacksQueue(const Napi::CallbackInfo& info);

#endif // INIT_PHASE_H