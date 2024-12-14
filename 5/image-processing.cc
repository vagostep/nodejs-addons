// grayscale.cpp
#include <node.h>
#define STB_IMAGE_IMPLEMENTATION
#include "stb_image.h"
#define STB_IMAGE_WRITE_IMPLEMENTATION
#include "stb_image_write.h"
#include <napi.h>

Napi::Value ConvertToGrayscale(const Napi::CallbackInfo &info)
{

  Napi::Env env = info.Env();

    if (info.Length() < 2 || !info[0].IsString() || !info[1].IsString()) {
        Napi::TypeError::New(env, "Two strings expected: input and output file paths").ThrowAsJavaScriptException();
        return Napi::String();
    }

    std::string inputFilePath = info[0].As<Napi::String>();
    std::string outputFilePath = info[1].As<Napi::String>();

    int width, height, channels;
    unsigned char *data = stbi_load(inputFilePath.c_str(), &width, &height, &channels, 0);
    if (!data) {
        Napi::Error::New(env, "Failed to load image").ThrowAsJavaScriptException();
        return Napi::String();
    }

    unsigned char *grayData = new unsigned char[width * height];

    for (int i = 0; i < width * height; i++) {
        int r = data[i * channels];
        int g = data[i * channels + 1];
        int b = data[i * channels + 2];
        grayData[i] = static_cast<unsigned char>(0.299 * r + 0.587 * g + 0.114 * b);
    }

    stbi_write_png(outputFilePath.c_str(), width, height, 1, grayData, width);
    
    stbi_image_free(data);
    delete[] grayData;

    return Napi::String::New(env, "Image converted to grayscale successfully.");
}

// Inicializar el módulo
Napi::Object Init(Napi::Env env, Napi::Object exports)
{
  exports.Set(Napi::String::New(env, "convertToGrayscale"), Napi::Function::New(env, ConvertToGrayscale));
  return exports;
}

NODE_API_MODULE(addon, Init);