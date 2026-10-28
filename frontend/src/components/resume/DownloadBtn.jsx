import React from 'react'
import { FiDownload } from 'react-icons/fi'
import { useReactToPrint } from 'react-to-print'
import { useCoins } from '../../apis/user.api'

function DownloadBtn({ docRef, user, setUser }) {
  const handlePdf = useReactToPrint({
    contentRef: docRef,
    documentTitle: 'FresherAI-Resume',
  })

  const handleDownload = async () => {
    try {
      const coinResponse = await useCoins({ coins: 10, action: 'download-pdf' })
      await handlePdf()
      setUser((current) => ({ ...current, interviewCoin: coinResponse?.interviewCoin }))
    } catch (error) {
      alert(error.message || 'Unable to download your resume.')
    }
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="flex items-center gap-2 rounded-lg bg-black px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
    >
      <FiDownload size={14} />
      Download PDF
    </button>
  )
}

export default DownloadBtn
