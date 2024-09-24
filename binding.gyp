{
    "targets": [
        {
            "target_name": "hello-world",
            "sources": [ "./1-hello-world/hello-world.cc" ],
            "include_dirs": [
                "<!@(node -p \"require('node-addon-api').include\")"
            ],
            "dependencies": [
                "<!(node -p \"require('node-addon-api').gyp\")"
            ],
            "cflags!": [ "-fno-exceptions" ],
            "cflags_cc!": [ "-fno-exceptions" ],
            "msvs_settings": {
                "VCCLCompilerTool": {
                "ExceptionHandling": 1
                }
            }
        },
        {
            "target_name": "long-loop",
            "sources": [ "./2-long-loop/addon/long-loop.cc" ],
            "include_dirs": [
                "<!@(node -p \"require('node-addon-api').include\")"
            ],
            "dependencies": [
                "<!(node -p \"require('node-addon-api').gyp\")"
            ],
            "cflags!": [ "-fno-exceptions" ],
            "cflags_cc!": [ "-fno-exceptions" ],
            "msvs_settings": {
                "VCCLCompilerTool": {
                "ExceptionHandling": 1
                }
            }
        },
        {
            "target_name": "event-loop-queues",
            "sources": [ 
                "./3-event-loop/timer-phase.cc", 
                "./3-event-loop/check-phase.cc",
                "./3-event-loop/close-phase.cc",
                "./3-event-loop/pending-callbacks-phase.cc",
                "./3-event-loop/init-phases.cc",
            ],
            "include_dirs": [
                "<!@(node -p \"require('node-addon-api').include\")"
            ],
            "dependencies": [
                "<!(node -p \"require('node-addon-api').gyp\")"
            ],
            "cflags!": [ "-fno-exceptions" ],
            "cflags_cc!": [ "-fno-exceptions" ],
            "msvs_settings": {
                "VCCLCompilerTool": {
                "ExceptionHandling": 1
                }
            }
        },
        {
            "target_name": "V8",
            "sources": [ "./4-V8/V8.cc" ],
            "include_dirs": [
                "<!@(node -p \"require('node-addon-api').include\")"
            ],
            "dependencies": [
                "<!(node -p \"require('node-addon-api').gyp\")"
            ],
            "cflags!": [ "-fno-exceptions" ],
            "cflags_cc!": [ "-fno-exceptions" ],
            "msvs_settings": {
                "VCCLCompilerTool": {
                "ExceptionHandling": 1
                }
            }
        }
    ]   
}