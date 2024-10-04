#!/bin/bash

# Function to get the current version
get_current_version() {
    grep '"version":' package.json | cut -d '"' -f 4
}

# Function to increment version
increment_version() {
    local version=$1
    local release_type=$2
    IFS='.' read -ra version_parts <<< "$version"

    case $release_type in
        "patch")
            ((version_parts[2]++))
            ;;
        "minor")
            ((version_parts[1]++))
            version_parts[2]=0
            ;;
        "major")
            ((version_parts[0]++))
            version_parts[1]=0
            version_parts[2]=0
            ;;
    esac

    echo "${version_parts[0]}.${version_parts[1]}.${version_parts[2]}"
}

# Get the current version
current_version=$(get_current_version)

# Prompt for release type
echo "Current version: $current_version"
echo "Enter release type (patch/minor/major):"
read release_type

# Increment version
new_version=$(increment_version "$current_version" "$release_type")

# Update version in package.json
sed -i '' "s/\"version\": \"$current_version\"/\"version\": \"$new_version\"/" package.json

# Prompt for release notes
echo "Enter release notes (Press Ctrl+D when finished):"
release_notes=$(cat)

# Commit changes
git add .
git commit -m "Release $new_version"

# Create a new tag
git tag -a "v$new_version" -m "Release $new_version"

# Push changes and tags
git push origin main
git push origin "v$new_version"

# Create a GitHub release using the GitHub CLI
gh release create "v$new_version" -t "Release $new_version" -n "$release_notes"

echo "Release $new_version created and pushed to GitHub"
