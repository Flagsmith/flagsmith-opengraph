[![Feature Flag, Remote Config and A/B Testing platform, Flagsmith](https://raw.githubusercontent.com/Flagsmith/flagsmith/main/static-files/hero.png)](https://flagsmith.com/)

Generates an SVG Image preview of feature states in a project using Vercel's [Santori](https://github.com/vercel/satori) project.


Generating an image:

An image url can be generated by converting an array of items to JWT.

```
export type Item = {
    feature_state_value?: string | number;
    segment_name?: string;
    environment_name: string;
    feature_value: boolean;
}

const items: Item[] = [{
      "feature_state_value": "Green",
      "environment_name": "Production",
      "feature_value": true
}]

const url = `https://flagsmith-opengraph.vercel.app/?t=${jwtEncode({payload:items})}

return (<img src={url}/>)
```


Alternatively, you can post to the following in order to get a base64 encoded SVG.

```
curl --location 'https://flagsmith-opengraph.vercel.app/api/image/base64' \
--header 'Content-Type: application/json' \
--data '[
    {
      "feature_state_value": "Blue",
      "environment_name": "Development",
      "feature_value": true
    }
  ]'
```

See a demo:
https://flagsmith-opengraph.vercel.app/



