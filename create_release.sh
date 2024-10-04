#!/bin/bash

# Function to increment version
increment_version() {
    local version=$1
    local major minor patch

    # Split version into major, minor, and patch
    IFS='.' read -r major minor patch <<< "$version"

    # Increment patch version
    patch=$((patch + 1))

    echo "$major.$minor.$patch"
}

# Get the last tag (version)
LAST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "v0.0.0")

# Remove 'v' prefix from the tag
LAST_VERSION=${LAST_TAG#v}

# Increment the version
NEW_VERSION=$(increment_version $LAST_VERSION)

# Get the current date
RELEASE_DATE=$(date +"%Y-%m-%d")

# Generate release notes
generate_release_notes() {
    echo "Release $NEW_VERSION ($RELEASE_DATE)"
    echo
    echo "Changes:"
    echo

    # Get list of changed files
    changed_files=$(git diff --name-only $LAST_TAG)

    # Loop through changed files and describe changes
    for file in $changed_files; do
        if [[ $file == *.js || $file == *.jsx ]]; then
            echo "- Updated $file:"
            git diff $LAST_TAG -- $file | grep '^+' | grep -v '^+++' | sed 's/^+/  /'
        elif [[ $file == *.css ]]; then
            echo "- Styled $file:"
            git diff $LAST_TAG -- $file | grep '^+' | grep -v '^+++' | sed 's/^+/  /'
        elif [[ $file == *.html ]]; then
            echo "- Modified HTML in $file"
        elif [[ $file == *.md ]]; then
            echo "- Updated documentation in $file"
        else
            echo "- Changed $file"
        fi
    done
}

# Generate release notes
RELEASE_NOTES=$(generate_release_notes)

# Save release notes to a file
echo "$RELEASE_NOTES" > release_notes.txt

# Commit all changes
git add .
git commit -m "Prepare release $NEW_VERSION"

# Create a new tag
git tag -a "v$NEW_VERSION" -m "Release $NEW_VERSION"

# Push changes and tags to GitHub
git push origin main
git push origin "v$NEW_VERSION"

# Create GitHub Release using GitHub CLI (gh)
# Make sure you have GitHub CLI installed and authenticated
if command -v gh &> /dev/null; then
    gh release create "v$NEW_VERSION" -F release_notes.txt
    echo "GitHub Release v$NEW_VERSION created successfully!"
else
    echo "GitHub CLI (gh) is not installed. Please create the release manually on GitHub."
    echo "Use the contents of release_notes.txt for the release description."
fi

echo "Release $NEW_VERSION has been created and pushed to GitHub."
echo "Release notes have been saved to release_notes.txt"
