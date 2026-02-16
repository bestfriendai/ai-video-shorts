# API Keys & Environment Variables

## Required Environment Variables

Create a `.env` file in the project root with the following variables:

### AI Video Generation APIs

| Variable | Provider | Required | Description |
|----------|----------|----------|-------------|
| `EXPO_PUBLIC_RUNWAY_API_KEY` | Runway ML | Optional | Gen-3 Alpha text-to-video |
| `EXPO_PUBLIC_PIKA_API_KEY` | Pika Labs | Optional | Pika 1.0 video generation |
| `EXPO_PUBLIC_STABILITY_API_KEY` | Stability AI | Optional | Stable Video Diffusion |

> At least one provider key is needed for AI video generation. The app falls back to local simulation mode if no keys are set.

### In-App Purchases

| Variable | Provider | Required | Description |
|----------|----------|----------|-------------|
| `REVENUECAT_API_KEY` | RevenueCat | For production | Manages subscriptions (configured in `app.config.js` → `extra.revenuecat_api_key`) |

---

## Where to Get Each Key

### 1. Runway ML — `EXPO_PUBLIC_RUNWAY_API_KEY`
- **Sign up:** https://app.runwayml.com/
- **API docs:** https://docs.runwayml.com/
- **Pricing:** ~$0.05/sec of generated video. Standard plan starts at $12/mo (625 credits). Gen-3 Alpha uses ~5 credits/sec.
- **How:** Sign up → Settings → API Keys → Create key

### 2. Pika Labs — `EXPO_PUBLIC_PIKA_API_KEY`
- **Sign up:** https://pika.art/
- **API docs:** https://docs.pika.art/
- **Pricing:** Free tier: 250 credits/mo. Pro: $8/mo (2000 credits). Each generation ~10-50 credits.
- **How:** Sign up → Account → Developer → Generate API key

### 3. Stability AI — `EXPO_PUBLIC_STABILITY_API_KEY`
- **Sign up:** https://platform.stability.ai/
- **API docs:** https://platform.stability.ai/docs/api-reference
- **Pricing:** Pay-per-request. ~$0.01-0.05/generation depending on model. 25 free credits on signup.
- **How:** Sign up → Account → API Keys → Create

### 4. RevenueCat — `REVENUECAT_API_KEY`
- **Sign up:** https://app.revenuecat.com/
- **Pricing:** Free up to $2.5K MTR. 1% of revenue after that.
- **How:** Sign up → Create project → App Settings → API Keys → Copy public key
- **Note:** Also requires App Store / Google Play setup for real purchases

---

## Example `.env` File

```env
# AI Video Generation (at least one recommended)
EXPO_PUBLIC_RUNWAY_API_KEY=rw_xxxxxxxxxxxxxxxxxxxxxxxx
EXPO_PUBLIC_PIKA_API_KEY=pk_xxxxxxxxxxxxxxxxxxxxxxxx
EXPO_PUBLIC_STABILITY_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx

# RevenueCat (for production IAP)
REVENUECAT_API_KEY=rcap_xxxxxxxxxxxxxxxxxxxxxxxx
```

---

## Notes

- All `EXPO_PUBLIC_*` variables are exposed to the client bundle (Expo convention)
- The app works without any API keys using **local simulation mode** — useful for development
- For production, configure at least one AI provider and RevenueCat
- Never commit your `.env` file — it's in `.gitignore`
