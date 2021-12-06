# STM32 USB HID Joystick first test!

![](/image/210828usbjoystickdevice.png)

It's a small step for me towards creating my own USB device. For this particular project, I wanted to create a sim racing shifter which I have somewhat develop the mechanism couple of weeks ago. (Work in progress)
<iframe width="560" height="315" src="https://www.youtube.com/embed/8b57a7hNR6I" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Download the 3D models of the gear shifter (STEP file) from [Here](/assets/simracing_shifter.step)

Back to the USB Joystick, I use STM32F103C8 (the blue pill) because

- I learn that they are cheap ~4USD
- It can works as a usb device which my favorite Arduino Uno doesn't. I don't have a very deep understanding on this topic but I learnted that Arduino Uno has USB to serial chip sits in between USB and the Atmel processor, so the computer (host) see it as serial device. Where as STM32 has a usb port connected directly to the controller, that USB can be anything you wish. The main draw back is that STM32 can't be programmed easily without bootloader. 
- To step up my microcontroller journey, I have heard many benefits of STM32.

## How to setup STM32 for USB HID Joystick

I learned most the following steps from this youtube clip https://youtu.be/tj1_hsQ5PR0 Then I made some changes to make the precess suitable for "joystick" instead of "keyboard"

1. On IOC file

    - Pinout & Configuration tab

        - Go to "RCC", set "High Speed Clock" to "Crystal/Ceramic"
        - Go to "SYS", set "Debug" to "Serial Wire"
        - Go to "USB", check "Device (FS)"
        - Go to "USB_DEVICE", on "Class For FS IP" select "Human Interface Device"

    - Clock Configuration tab

        - Press resolve clock issue
        - Set HCLK to 72 MHz

    - Save the file

1. Open "usbd_hid.c" located in Middlewares > ST > STM32_USB_Device_Library > Class > HID > Src > usbd_hid.c

    - Find this line
        ```c
        0x02,         /*nInterfaceProtocol : 0=none, 1=keyboard, 2=mouse*/
        ```
        and change the original value 0x02 (for mouse) to 0x00 for joystick

    - Find this code section

        ```c
        __ALIGN_BEGIN static uint8_t HID_MOUSE_ReportDesc[HID_MOUSE_REPORT_DESC_SIZE]  __ALIGN_END = 
        {
            ...
        };
        ```

        All original content inside is an example of a mouse USB descriptor. Delete them and replace with our simple USB descriptor for a joystick.
        ```c
        0x05, 0x01, //; USAGE_PAGE (Generic Desktop)
        0x09, 0x05, //; USAGE (Gamepad)
        0xA1, 0x01, //; COLLECTION (Application)
        0x05, 0x09,// ; USAGE_PAGE (Button)
        0x19, 0x01, //; USAGE_MINIMUM (Button 1)
        0x29, 0x08, //; USAGE_MAXIMUM (Button 8)
        0x15, 0x00, //; LOGICAL_MINIMUM (0)
        0x25, 0x01, //; LOGICAL_MAXIMUM (1)
        0x75, 0x01, //; REPORT_SIZE (1)
        0x95, 0x08, //; REPORT_COUNT (8)
        0x81, 0x02, //; INPUT (Data,Var,Abs)
        0xC0,// ; END_COLLECTION
        ```
        In fact this descriptor is generated from a software called "HID Descriptor Tool" which can be downloaded from https://www.usb.org/hid
        . To have better understanding on how to create a custom destriptors (any line aboves and be customed), we need to learn the rules which can be found on the same site but they are overwhelming.

        - If we make our device talks in HID format (which we are doing), we can plug and play with the Windows. That's awesome.
        
        - From my understanding, it says that a packet length from our HID joystick is one byte. The value of that byte denotes Button1-8, essentially 8 buttons = 8 boolean = 1 byte.

    - Ctrl click "HID_MOUSE_REPORT_DESC_SIZE" to go to the definition. Change it's value to "23U". Note that the number 23 is exactly the bytes count of the descriptor above. "U" explicit tells that the value is unsigned.

1. Go to "main.c"

    - Add the following lines outside main

        ```c
        #include "usb_device.h"
        extern USBD_HandleTypeDef hUsbDeviceFS;
        typedef struct
        {
            uint8_t BTN;
        } Report;
        Report report = {0};
        ```
        Report stuct's size is one byte to match with the above descriptor

    - Inside while loop of the main function
        ```c
        report.BTN = 0x01;
        USBD_HID_SendReport(&hUsbDeviceFS, &report, sizeof(report));
	    HAL_Delay(30);
        ```
        Set report value to the value we want to send back to PC. In this example, it sends back 0x01 which means "Button1" of the joystick is pressed. I am not sure if the delay is needed and what value is suitable but I took it from the example. But I think it makes sense to prevent CPU from getting too busy.
    
Learning about HID device to me is like opening the door to a whole new world where we can develop our custom USB devices. I am excited to see what I can use it for.