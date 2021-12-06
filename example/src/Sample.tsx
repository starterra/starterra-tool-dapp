import React, { useState } from 'react'
import { useWallet, useConnectedWallet } from 'starterra-tool-dapp'
import { SignBytesResult, verifyBytes } from "@terra-money/wallet-provider"

const Sample = () => {
  const [value1, setValue1] = useState("StarTerra rules!")
  const [value2, setValue2] = useState("")
  const [result, setResult] = useState<SignBytesResult["result"]>()

  
  const { network,signBytes } = useWallet()
  const connectedWallet = useConnectedWallet()

  const sign = async () => {
    const { result, success } = await signBytes(Buffer.from(value1))
    success ? setResult(result) : alert("Failed to sign")
  }

  const verify = () => {
    if (!result) throw new Error("Not signed yet")
    const matched = verifyBytes(Buffer.from(value2), result)
    alert(matched ? "Success" : "Failed")
  }

  return (
    <>
    <div>
 
      <p>{network.name}</p>
      <p>{connectedWallet?.terraAddress}</p>
    </div>



<section>
  <h2>Sign the text below</h2>
  <input value={value1} onChange={(e) => setValue1(e.target.value)} />
  <button onClick={sign}>Sign</button>
  {result && <p>The response is stored in the state</p>}
</section>

<section>
  <h2>Verify</h2>
  <p>
    Enter <code>{value1}</code> below and press the button to verify the
    value of input with the stored state. (If it matches the value written
    above, it succeeds, and if it doesn't match, it fails.)
  </p>
  <input value={value2} onChange={(e) => setValue2(e.target.value)} />
  <button onClick={verify} disabled={!result}>
    {!result ? "Not signed yet" : "Verify"}
  </button>
</section>
</>
  )
}

export default Sample
