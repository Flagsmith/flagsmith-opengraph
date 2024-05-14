'use client'

import * as jose from 'jose'
import {useEffect, useState} from "react";
export default function Home() {
  const data = [
    {
      "feature_state_value": "Blue",
      "environment_name": "Development",
      "feature_value": "False"
    },
    {
      "feature_state_value": 1,
      "environment_name": "Production",
      "feature_value": "True"
    },
    {
      "feature_state_value": "Green",
      "environment_name": "Staging",
      "feature_value": "True"
    },
    {
      "environment_name": "QA",
      "feature_value": "False"
    },
    {
      "segment_name": "flagsmith_team",
      "feature_state_value": "Yellow",

      "environment_name": "Production",
      "feature_value": "True"
    },
    {
      "segment_name": "beta_users",
      "feature_state_value": "Orange",

      "environment_name": "Production",
      "feature_value": "True"
    },
    {
      "segment_name": "50%_split",
      "feature_state_value": "Green",
      "environment_name": "Production",
      "feature_value": "True"
    }
  ]
  const [encodedData, setEncodedData] = useState("");
  useEffect(() => {
    const parseJWT = async function () {
      const alg = 'HS256'

      const encodedData = await new jose.SignJWT({
        payload: data
      })
          .setProtectedHeader({ alg })
          .sign(new TextEncoder().encode('secret'))
      const newData = encodeURIComponent(encodedData)
      setEncodedData(newData)
    }
    parseJWT()
  }, []);
  return <div
  style={{
    fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  }}
  >

    <h1>
      Flagsmith-OpenGraph
    </h1>
    <p>
      The following is an svg image url:
    </p>

    <div style={{background:'#22272E',maxWidth:850, borderRadius:8, padding:25,}}>
      <h3 style={{
        color:'rgb(197, 209, 222)',
      }}>Dark Mode</h3>
      {encodedData&&(
          <img style={{width:"100%"}} src={`/api/image?t=${encodedData}`}/>
      )}
    </div>
    <div style={{maxWidth:850, borderRadius:8, padding:25,}}>
      <h3>Light Mode</h3>
      {encodedData&&(
          <img style={{width:"100%"}} src={`/api/image?t=${encodedData}`}/>
      )}
    </div>
  </div>
}
