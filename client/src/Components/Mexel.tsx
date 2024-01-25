import { SignInPage } from './SignInPage';
import { SignUpPage } from './SignUpPage';
import { TestPlayer } from './TestPlayer';
import { InputPage } from './InputPage';
import { LeftMenu } from './LeftMenu';
import { SavedSongs } from './SavedSongs';
import { SavedPlaylists } from './SavedPlaylists';
import { useState } from 'react';
import { SoundCloudStream, YouTubeStream } from 'play-dl';

export function Mexel() {
  const [source, setSource] = useState<YouTubeStream | SoundCloudStream>();

  async function getSong(linkToConvert: string) {
    try {
      console.log(`this is the link: ${linkToConvert}`);
      const response = await fetch('/api/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(linkToConvert),
      });
      if (!response.ok) {
        throw new Error(`fetch error ${response.status}`);
      }
      const data = await response.json();
      setSource(data);
      console.log(`this is data: ${data}`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <SignUpPage />
      <SignInPage />
      <TestPlayer source={source} />
      <InputPage onSubmit={getSong} />
      <LeftMenu />
      <SavedSongs />
      <SavedPlaylists />
    </div>
  );
}
