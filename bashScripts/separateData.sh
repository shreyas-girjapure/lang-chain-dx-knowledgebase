#!/bin/bash

# Define the input file containing commands
input_file="bashScripts/sfdx_commands_help.sh"

# Define the output file for the combined output
output_file="combined_output.txt"

# Initialize the output file
> "$output_file"

# Read each line from the input file
while IFS= read -r line; do
    # Execute the command and append its output to the output file
    command_output="$(eval "$line" 2>&1)"
    echo "$command_output" >> "$output_file"
    # Append two new lines to separate command outputs
    echo -e "\n\n" >> "$output_file"
done < "$input_file"

echo "Output from all commands has been combined and saved to $output_file"
