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

    <div style={{maxWidth:850, borderRadius:8, padding:25, marginBottom:50, background:'#22272E'}}>
      <h3 style={{
        color:'rgb(197, 209, 222)',
      }}>Dark Mode</h3>
      <img style={{width:"100%"}} src='/api/image'/>
    </div>
    <div style={{maxWidth:850, borderRadius:8, padding:25, marginBottom:50,}}>
      <h3>Light Mode</h3>
      <img style={{width:"100%"}} src='/api/image'/>
    </div>

  </div>
}
