import os
from mutagen.easyid3 import EasyID3
from mutagen.mp3 import MP3

# Path to 'songs' directory
songs_dir = os.getcwd()

# List all files in the directory
all_files = [f for f in os.listdir(songs_dir) if f.endswith('.mp3')]

# Limit to first 5 files
first_5_files = all_files[:5]

# Words to remove from metadata
remove_words = ["MassTamilan.com", "MassTamilan.io", "MassTamilan.dev", "MassTamilan"]

def clean_text(text):
    """Remove unwanted words from a metadata field."""
    for word in remove_words:
        text = text.replace(word, "").strip()
    return text

# Extract, clean, and display metadata
for file in first_5_files:
    file_path = os.path.join(songs_dir, file)
    try:
        audio = MP3(file_path, ID3=EasyID3)

        # Clean and update Title
        title = audio.get('title', ['N/A'])[0]
        cleaned_title = clean_text(title)

        # Clean and update Artist
        artist = audio.get('artist', ['N/A'])[0]
        cleaned_artist = clean_text(artist)

        # Clean and update Album
        album = audio.get('album', ['N/A'])[0]
        cleaned_album = clean_text(album)

        # Update metadata if any changes were made
        if title != cleaned_title:
            audio['title'] = cleaned_title
        if artist != cleaned_artist:
            audio['artist'] = cleaned_artist
        if album != cleaned_album:
            audio['album'] = cleaned_album

        # Save changes if needed
        if title != cleaned_title or artist != cleaned_artist or album != cleaned_album:
            audio.save()

        # Display metadata
        print(f"Metadata for: {file}")
        print(f"Title: {cleaned_title}")
        print(f"Artist: {cleaned_artist}")
        print(f"Album: {cleaned_album}")
        print(f"Duration: {audio.info.length:.2f} seconds")
        print("-" * 40)

    except Exception as e:
        print(f"Could not read metadata for {file}: {e}")
