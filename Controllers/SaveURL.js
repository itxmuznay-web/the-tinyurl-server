import { URLs } from "../Models/url.js";
import { generateShortId } from "../Utils/Keys.js";

export const SaveURL = async (req, res) => {
  let { longUrl } = req.body;
  try {
    // Normalize URL: add https:// if no protocol is present
    if (!/^https?:\/\//i.test(longUrl)) {
      longUrl = `https://${longUrl}`;
    }

    const shortId = generateShortId(7);
    const newURL = new URLs({ longUrl: longUrl, shortId: shortId });
    await newURL.save();
    const shortURL = `https://the-tinyurl.up.railway.app/${shortId}`;
    res.status(200).json({
      ok: true,
      shortURL: shortURL,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
    });
  }
};
