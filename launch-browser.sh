#!/bin/bash

# Launch Brave browser with custom profile and CDP enabled
# Profile will be stored in .brave-profile directory
# CDP will be available on port 9222

PROFILE_DIR=".brave-profile"
CDP_PORT="9222"

# Function to clean session data while preserving cache
cleanup_session_data() {
    echo "🧹 Cleaning session data from profile directory..."
    
    # Remove session-related files/directories
    if [ -d "$PROFILE_DIR/Default/Sessions" ]; then
        rm -rf "$PROFILE_DIR/Default/Sessions"
        echo "  ✅ Removed Sessions directory"
    fi
    
    if [ -d "$PROFILE_DIR/Default/Session Storage" ]; then
        rm -rf "$PROFILE_DIR/Default/Session Storage"
        echo "  ✅ Removed Session Storage directory"
    fi
    
    # Remove Local State file (contains session restore data)
    if [ -f "$PROFILE_DIR/Local State" ]; then
        rm -f "$PROFILE_DIR/Local State"
        echo "  ✅ Removed Local State file"
    fi
    
    echo "  📦 Cache and other profile data preserved"
}

# Create profile directory if it doesn't exist
mkdir -p "$PROFILE_DIR"

# Clean session data before launching
cleanup_session_data

echo "Launching Brave browser with stealth configuration..."
echo "Profile directory: $PROFILE_DIR"
echo "CDP listening on port: $CDP_PORT"

# Launch Brave with CDP, custom profile, and stealth arguments
# Using macOS path for Brave Browser
"/Applications/Brave Browser.app/Contents/MacOS/Brave Browser" \
    --user-data-dir="$PROFILE_DIR" \
    --homepage about:blank \
    --disable-p3a \
    --remote-debugging-port="$CDP_PORT" \
    --no-first-run \
    --no-default-browser-check \
    --disable-extensions \
    --disable-web-security \
    --disable-features=VizDisplayCompositor \
    --disable-blink-features=AutomationControlled \
    --disable-dev-shm-usage \
    --no-sandbox \
    --disable-setuid-sandbox \
    --disable-infobars \
    --disable-background-timer-throttling \
    --disable-backgrounding-occluded-windows \
    --disable-renderer-backgrounding \
    --disable-field-trial-config \
    --disable-back-forward-cache \
    --disable-ipc-flooding-protection \
    --disable-default-apps \
    --disable-sync \
    --disable-translate \
    --hide-scrollbars \
    --mute-audio \
    --no-first-run \
    --no-default-browser-check \
    --no-sandbox \
    --disable-gpu-sandbox \
    --disable-software-rasterizer \
    "$@" &