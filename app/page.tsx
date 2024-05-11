'use client'
export default function Home() {
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
    <div style={{position:'relative'}}>
      <img src={"/img.png"}/>
      <img width="780" style={{position:"absolute", top:70, left:95}} src='/api/image'/>
    </div>
  </div>
}
