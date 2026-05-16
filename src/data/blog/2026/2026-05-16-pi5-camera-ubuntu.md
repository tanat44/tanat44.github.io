---
pubDatetime: 2026-05-16
title: Compile Raspberry Pi5 Camera library on Ubuntu 24.04
tags:
  - blog
  - programming
description: asdf
---

This is a comprehensive guide on how to get Camera Module 3 working on Raspberry Pi5 on Ubuntu 2404. This guide is mainly based on the  [official camera software guide](https://www.raspberrypi.com/documentation/computers/camera_software.html#building-libcamera) but more focus on how to get it to work on Ubuntu 2404. 

1. Do not install libcamera from apt-get. 
1. We will build all libraries in the following order, libcamera / rpicam-apps / libepoxy.

If building everything using the steps described below is overwhelming, try using the [precompiled binaries](/pi5cam-ubuntu.tar.xz) (tested on Pi5, Ubuntu 24.04LTS as of May 2026). Extract the files to /usr/local and skip to test section.

## Building libcamera
1. for libcamera during "step to configure build environment" use this command instead `meson setup build   -Dpycamera=enabled  -Dpython.platlibdir=/usr/local/lib/python3.12/dist-packages`
    1. without this command you will get module binding error "ImportError: dynamic module does not define module export function (PyInit__libcamera)" when "import libcamera"

## Building rpicam
1. for rpicam-app change '-Denable_libav=disabled' to disabled

## Building pykms
1. for pykms
    1. run ```sh
    git clone https://github.com/tomba/kmsxx.git
    cd kmsxx/
    sudo apt install libfmt-dev libdrm-dev
    git submodule update --init
    meson build -Dpykms=enabled
    sudo ninja -C build install
    ```
    1. copy build output to correct python lib location `sudo cp -r /usr/local/lib/aarch64-linux-gnu/python3.12/site-packages/pykms /usr/local/lib/python3.12/dist-packages/`
1. `pip install opencv-contrib-python opencv-python`

## Post building setting
1. allow dynamic linker `sudo ldconfig`
1. add to .bashrc `export LD_LIBRARY_PATH="/usr/local/lib/aarch64-linux-gnu:$LD_LIBRARY_PATH"` (ref)[https://askubuntu.com/questions/1550540/libcamera-issues-with-ubuntu-24-04-lts]

## Test
1. try run `rpicam-hello` should give you preview. `rpicam-hello --list-cameras` should give you connected camera
    1. if getting this error "dmaHeap allocation failure for rpicam-apps0"
    1. run `sudo rpicam-hello` should temporary solve the problem
    1. to permanently fix the issue, run the following command to allow current group. [ref](https://github.com/raspberrypi/rpicam-apps/issues/912)
    ```sh
    sudo tee /etc/udev/rules.d/99-dmaheap.rules <<EOF
    SUBSYSTEM=="dma_heap", GROUP="MY_CURRENT_GROUP", MODE="0660"
    EOF

    sudo udevadm control --reload-rules
    sudo udevadm trigger
    ```