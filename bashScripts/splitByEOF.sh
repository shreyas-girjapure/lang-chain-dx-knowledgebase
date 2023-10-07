#!/bin/bash

# Input file
input_file="SFDX-Data/FutureScope/combined_output.txt"

# Delimiter
delimiter="EOF"

# Initialize a counter
counter=0

# Create an output directory
output_dir="output"
mkdir -p "$output_dir"

# Function to create a new output file
create_output_file() {
  ((counter++))
  output_file="$output_dir/output_$counter.txt"
  touch "$output_file"
}

# Initialize the first output file
create_output_file

# Read the input file line by line
while IFS= read -r line; do
  if [[ $line == *"$delimiter"* ]]; then
    # Create a new output file when the delimiter is encountered
    create_output_file
  else
    # Append the line to the current output file
    echo "$line" >> "$output_file"
  fi
done < "$input_file"
