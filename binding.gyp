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
            "target_name": "addon",
            "sources": [ "./2-long-loop/1/long-loop.cc" ],
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
            "target_name": "image-processor",
            "sources": [ "./6-image-processing/image-processing.cc" ],
            "include_dirs": [
                "<!@(node -p \"require('node-addon-api').include\")",
                "./6-image-processing/libraries"
            ],
            "dependencies": [
                "<!(node -p \"require('node-addon-api').gyp\")"
            ],
            "cflags!": [ "-fno-exceptions", "-Wno-write-strings" ],
            "cflags_cc!": [ "-fno-exceptions" ],
            "msvs_settings": {
                "VCCLCompilerTool": {
                "ExceptionHandling": 1
                }
            }
        },
        {
            "target_name": "complex-calc",
            "sources": [ "./7-complex-calc/complex-calc.cc" ],
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