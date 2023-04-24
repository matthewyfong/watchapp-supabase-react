import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import QRCode from 'qrcode.react'

export default function GetHelp({ session }) {
    console.log("SDFSD")
    const [audioUrls, setAudioUrls] = useState([]);
    const [qrCodeUrls, setQRCodeUrls] = useState([]);
    const [currentAudioUrl, setCurrentAudioUrl] = useState('');
    const [currentQRCodeUrl, setCurrentQRCodeUrl] = useState('');


    useEffect(() => {
        fetchUrls();
    }, []);

    const fetchUrls = async () => {
        const { data: audioData, error: audioError } = await supabase
            .from('user_account')
            .select('audio_link')
            .eq('actual_user', session.user.id);

        if (audioError) {
            console.error(audioError);
        } else {
            setAudioUrls(audioData);
        }

        const { data: qrCodeData, error: qrCodeError } = await supabase
            .from('user_account')
            .select('qr_link')
            .eq('actual_user', session.user.id);

        if (qrCodeError) {
            console.error(qrCodeError);
        } else {
            setQRCodeUrls(qrCodeData);
        }
    };

    const handleButtonClick = (audioUrl, qrCodeUrl) => {
      setCurrentAudioUrl(audioUrl);
      setCurrentQRCodeUrl(qrCodeUrl);
    };

    return (
        <div>
        {audioUrls.map((audio, index) => (
            <button key={`audio_${index}`} onClick={() => handleButtonClick(audio.url, qrCodeUrls[index].url)}>
            Show QR Code {index + 1} and play Audio {index + 1}
            </button>
        ))}
        <br />
        {currentAudioUrl && (
            <audio controls>
            <source src={currentAudioUrl} type="audio/mp3" />
            </audio>
        )}
        <br />
        {currentQRCodeUrl && (
            <QRCode value={currentQRCodeUrl} size={256} renderAs="svg" />
        )}
        </div>
    );
}