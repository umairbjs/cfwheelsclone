#!/bin/bash

# Function to start the CommandBox server
start_server() {
    echo "Starting CommandBox server..."
    box server start port=8080 cfengine=lucee@5 -b 0.0.0.0 -console 
}

# Start the CommandBox server in a loop
while true; do
    start_server
    echo "CommandBox server exited. Restarting..."
    sleep 1
done
