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
            "sources": [ "./2/1/long-loop.cc" ],
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
                "./3/timer-phase.cc", 
                "./3/check-phase.cc",
                "./3/pending-callbacks-phase.cc",
                "./3/init-phases.cc",
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
            "sources": [ "./5/image-processing.cc" ],
            "include_dirs": [
                "<!@(node -p \"require('node-addon-api').include\")",
                "./5/libraries"
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
            "sources": [ "./6/complex-calc.cc" ],
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