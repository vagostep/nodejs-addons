{
    "targets": [
        {
            "target_name": "long-loop",
            "sources": [ "./long-loop.cc" ],
            "include_dirs": [
                "node_modules/node-addon-api"
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