#!/bin/bash


# Create a temporary file with the updated sample data > 
sfdx commands > temp_commands.txt

# Extract and store only the commands in a separate file
grep -o '^.\{1,44\}' temp_commands.txt > sfdx_commands.txt

# Clean up the temporary file
rm temp_commands.txt

echo "Commands have been extracted and saved to sfdx_commands.txt"
