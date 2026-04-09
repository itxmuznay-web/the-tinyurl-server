import { URLs } from "../Models/url.js";
import {getCache,setCache} from "../utils/redis.js"
export const RedirectURL = async (req, res) => {
  const { shortId } = req.params;
  try {
    const longUrlFromCache =  await getCache(shortId);
    if (longUrlFromCache) {
      console.log("Cache Hit")
      res.redirect(element.longUrl);
      return;
    }
  
 //Cache Miss
    const resUrls = await URLs.find({ shortId: shortId });
    const element = resUrls[0];
     await setCache(shortId, element.longUrl)

    res.redirect(element.longUrl);
  } catch (err) {
    res.status(500).json({
      ok: false,
    });
  }
}
