import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

export default function Account({ session }) {
  const [loading, setLoading] = useState(true)
  const [first_name, setFirstName] = useState(null)
  const [last_name, setLastName] = useState(null)
  const [qr_link, setQRLink] = useState(null)
  const [audio_link, setAudioLink] = useState(null)

  useEffect(() => {
    async function getProfile() {
      setLoading(true)
      const { user } = session

      let { data, error } = await supabase
        .from('user_account')
        .select(`first_name, last_name, qr_link, audio_link`)
        .eq('actual_user', user.id)
        .single()

      if (error) {
        console.warn(error)
      } else if (data) {
        setFirstName(data.first_name)
        setLastName(data.last_name)
        setQRLink(data.qr_link)
        setAudioLink(data.audio_link)
      }

      setLoading(false)
    }

    getProfile()
  }, [session])

  async function updateProfile(event) {
    event.preventDefault()

    setLoading(true)
    const { user } = session

    const updates = {
      first_name,
      last_name,
      qr_link,
      audio_link,
    }

    let { error } = await supabase.from('user_account').upsert(updates)

    if (error) {
      alert(error.message)
    }
    setLoading(false)
  }

  return (
    // <form onSubmit={updateProfile} className="form-widget">
    //   <div>
    //     <label htmlFor="email">Email</label>
    //     <input id="email" type="text" value={session.user.email} disabled />
    //   </div>
    //   <div>
    //     <label htmlFor="first_name">First Name</label>
    //     <input
    //       id="first_name"
    //       type="text"
    //       required
    //       value={first_name || ''}
    //       onChange={(e) => setFirstName(e.target.value)}
    //     />
    //   </div>
    //   <div>
    //     <label htmlFor="last_name">Last Name</label>
    //     <input
    //       id="last_name"
    //       type="text"
    //       required
    //       value={last_name || ''}
    //       onChange={(e) => setLastName(e.target.value)}
    //     />
    //   </div>
    //   <div>
    //     <label htmlFor="qr_link">QR Code</label>
    //     <input
    //       id="qr_link"
    //       type="text"
    //       value={qr_link || ''}
    //       onChange={(e) => setQRLink(e.target.value)}
    //     />
    //   </div>
    //   <div>
    //     <label htmlFor="audio_link">Audio File URL</label>
    //     <input
    //       id="audio_link"
    //       type="text"
    //       value={audio_link || ''}
    //       onChange={(e) => setAudioLink(e.target.value)}
    //     />
    //   </div>

    //   <div>
    //     <button className="button block primary" type="submit" disabled={loading}>
    //       {loading ? 'Loading ...' : 'Update'}
    //     </button>
    //   </div>

    //   <div>
    //     <button className="button block" type="button" onClick={() => supabase.auth.signOut()}>
    //       Sign Out
    //     </button>
    //   </div>
    // </form>
    <div>
        <img src={qr_link}></img>
        <audio controls>
            {console.log(audio_link)}
        {loading ? 'loading' : <source src={audio_link} type="audio/wav"/>}
        </audio>
    </div>
  )
}
