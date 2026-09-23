import { useEffect, useRef, useState } from 'react'
import BackgroundPetals from './components/BackgroundPetals.jsx'
import DisclaimerPage from './components/DisclaimerPage.jsx'
import MusicSelectPage from './components/MusicSelectPage.jsx'
import VerifyPage from './components/VerifyPage.jsx'
import LoadingScreen from './components/LoadingScreen.jsx'
import RevealPage from './components/RevealPage.jsx'
import AlbumIntroPage from './components/AlbumIntroPage.jsx'
import Photo1Page from './components/Photo1Page.jsx'
import Photo2Page from './components/Photo2Page.jsx'
import Photo3Page from './components/Photo3Page.jsx'
import Photo4Page from './components/Photo4Page.jsx'
import LastPartQuestionPage from './components/LastPartQuestionPage.jsx'
import MatchLightingSequence from './components/MatchLightingSequence.jsx'
import FinalMessagePage from './components/FinalMessagePage.jsx'
import MusicPlayer from './components/MusicPlayer.jsx'
import { CORRECT_DOB, SONGS } from './config.js'

// stage: 'verify' | 'loading' | 'disclaimer' | 'musicSelect' | 'reveal' | 'albumIntro' | 'photo1' | 'photo2' | 'photo3' | 'photo4' | 'lastPartQuestion' | 'matchLighting' | 'final'
export default function App() {
  const [stage, setStage] = useState('verify')
  const [isPendingCorrect, setIsPendingCorrect] = useState(false)
  const [wrongAttempt, setWrongAttempt] = useState(0)
  const [selectedSongIndex, setSelectedSongIndex] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playerExpanded, setPlayerExpanded] = useState(false)
  const [finalReady, setFinalReady] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    function handlePlay() {
      setIsPlaying(true)
    }

    function handlePause() {
      setIsPlaying(false)
    }

    function handleEnded() {
      setIsPlaying(false)
    }

    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [])

  useEffect(() => {
    if (stage !== 'final') {
      setFinalReady(false)
      return
    }

    // Keep music behavior consistent with other pages on the final page.
    setFinalReady(true)
  }, [stage, selectedSongIndex])

  function selectSong(index) {
    const audio = audioRef.current
    if (!audio) return

    setSelectedSongIndex(index)
    setPlayerExpanded(false)

    audio.src = SONGS[index].src
    audio.currentTime = 0
    audio.volume = 1

    const playPromise = audio.play()
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        setIsPlaying(false)
      })
    }
  }

  function playAudio() {
    const audio = audioRef.current
    if (!audio || selectedSongIndex === null) return

    audio.volume = 1
    const playPromise = audio.play()
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        setIsPlaying(false)
      })
    }
  }

  function pauseAudio() {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
  }

  function handleSubmit(date) {
    setIsPendingCorrect(date === CORRECT_DOB)
    setStage('loading')
  }

  function handleLoadingDone() {
    if (isPendingCorrect) {
      setStage('disclaimer')
    } else {
      setWrongAttempt((n) => n + 1)
      setStage('verify')
    }
  }

  const showMusicPlayer =
    selectedSongIndex !== null &&
    stage !== 'disclaimer' &&
    stage !== 'musicSelect'

  return (
    <>
      <audio ref={audioRef} preload="metadata" />
      <BackgroundPetals />

      {stage === 'disclaimer' && <DisclaimerPage onContinue={() => setStage('musicSelect')} />}

      {stage === 'musicSelect' && (
        <MusicSelectPage
          songs={SONGS}
          selectedSongIndex={selectedSongIndex}
          isPlaying={isPlaying}
          onSelectSong={selectSong}
          onContinue={() => setStage('albumIntro')}
        />
      )}

      {stage === 'verify' && (
        <VerifyPage onSubmit={handleSubmit} wrongAttempt={wrongAttempt} />
      )}
      {stage === 'loading' && (
        <LoadingScreen onDone={handleLoadingDone} showSuccessStep={isPendingCorrect} />
      )}
      {stage === 'reveal' && <RevealPage onContinue={() => setStage('albumIntro')} />}
      {stage === 'albumIntro' && <AlbumIntroPage onNext={() => setStage('photo1')} />}
      {stage === 'photo1' && <Photo1Page onNext={() => setStage('photo2')} />}
      {stage === 'photo2' && <Photo2Page onNext={() => setStage('photo3')} />}
      {stage === 'photo3' && <Photo3Page onNext={() => setStage('photo4')} />}
      {stage === 'photo4' && <Photo4Page onNext={() => setStage('lastPartQuestion')} />}
      {stage === 'lastPartQuestion' && <LastPartQuestionPage onYes={() => setStage('matchLighting')} />}
      {stage === 'matchLighting' && <MatchLightingSequence onDone={() => setStage('final')} />}
      {stage === 'final' && <FinalMessagePage ready={finalReady} />}

      {showMusicPlayer && (
        <MusicPlayer
          songs={SONGS}
          selectedSongIndex={selectedSongIndex}
          isPlaying={isPlaying}
          expanded={playerExpanded}
          onToggleExpanded={() => setPlayerExpanded((v) => !v)}
          onPlay={playAudio}
          onPause={pauseAudio}
          onSelectSong={selectSong}
        />
      )}
    </>
  )
}
