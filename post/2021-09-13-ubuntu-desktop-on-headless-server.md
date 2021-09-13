# How to setup Ubuntu Desktop on Headless Server
I have an issue when trying to setup a build server for Unity Project on Ubuntu Server because Unity, although it can be build to command line interface, has to be installed through GUI (Unity Hub). The only way I can achieve my goal is to get GUI running on the Ubuntu server, then I can remote desktop to setup Unity Hub. 

*Headless server is a server machine that doesn't connect to any monitor*

You need 2 machines:
1. Client - this machine needs a remote desktop app
1. Server - which is headless and no GUI is installed

## On Server Machine
1. Install ubuntu-desktop for a GUI software that's needed to run desktop
    ```
    sudo apt install ubuntu-desktop
    ```
1. Install tightvncserver to be able to serve remote desktop
    ```
    sudo apt install tightvncserver
    ```
    1. Run vncserver for the first time using command ```vncserver```
    1. Set the password and 'Enter' untill setup is completed
    1. To kill the server, type ```vncserver -kill :1``` Number 1 can be modified to match the XSERVER number that you what to kill. (if you type vnc server again without killing the previous ones, more XSERVER will be generated)
    1. The server No.1 is available at port 5901
    1. Kill x-server
1. Setup vncserver by running editing file ```nano ~/.vnc/xstart``` Replace the original content with following setting.
    ```
    [ -x /etc/vnc/xstartup ] && exec /etc/vnc/xstartup
    [ -r $HOME/.Xresources ] && xrdb $HOME/.Xresources
    xsetroot -solid grey
    vncconfig -iconic &
    x-terminal-emulator -geometry 80x24+10+10 -ls -title "$VNCDESKTOP Desktop" &

    export XDG_CURRENT_DESKTOP="GNOME-Flashback:GNOME"
    export XDG_MENU_PREFIX="gnome-flashback-"
    gnome-session --session=gnome-flashback-metacity --disable-acceleration-check &
    ```
    Save and exit nano.
1. Create .XResources file at home directory ```touch ~/.Xresources```
1. Start the server by running ```vncserver -geometry 1920x1080``` Desktop resolution is specified by argument after -geometry.
1. To show the log, type ```tail -f ~/.vnc/{yourServerName}:1.log```
1. Now your Vncserver (the graphic server that render your desktop) is serving at port 5901. **However, we don't want to have our server exposing all ports. Later on we will forward 5901 connection on server to ssh tunnel**

## On Client Machine
Assuming you have Ubuntu desktop running in this machine.
1. Install Vinagre (Most of the time you already have it installed)
    ```
    sudo apt install vinagre
    ```
    Once the installation is completed, the program is called "Remote Desktop Viewer" in the app menu. 
1. On open terminal and type this command
    ```
    ssh -L 5901:127.0.0.1:5901 -C -N -l {vncPasswrod} {serverAddress}
    ```
    The above command bind 5901 on server to 5901 on this client via ssh connection.
1. Open remote desktop app (Vinagre we installed eariler)
    1. Click Connect
    1. Protocol choose "VNC"
    1. Under Host type "127.0.0.1:5901"
    1. Check "Scaling" and "Keep aspect ratio"
    1. Click Connect

You should be able to use the desktop. On Vinagre, make sure you have "View > Keyboard shortcuts" checked, otherwise you can't get out of full screen mode (F11).

On Windows client, I use TightVNC as remote desktop client.