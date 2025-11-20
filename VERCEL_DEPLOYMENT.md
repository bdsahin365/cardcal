# Vercel Deployment Guide

This guide will walk you through deploying your CardCal application to Vercel with all necessary environment variables.

## Prerequisites

- A GitHub account
- A Vercel account ([Sign up here](https://vercel.com))
- OpenAI API key (see [OpenAI Setup](#openai-api-key-setup) below)
- Supabase project (see [SUPABASE_SETUP.md](./SUPABASE_SETUP.md))

## Step 1: OpenAI API Key Setup

### What is an OpenAI API Key?

An **OpenAI API Key** is a unique authentication token that allows your application to access OpenAI's services, specifically:
- **GPT-3.5-turbo** - Used for generating AI commentary and team name suggestions
- **Chat Completions API** - Powers the Bengali e-sports commentary feature

### How to Get an OpenAI API Key

1. **Create an OpenAI Account**
   - Go to [OpenAI Platform](https://platform.openai.com)
   - Click "Sign up" or "Log in"
   - Complete the registration process

2. **Add Payment Method** (Required)
   - OpenAI requires a payment method to use the API
   - Go to **Settings** → **Billing**
   - Add a credit card or payment method
   - Note: You get $5 free credit to start with

3. **Generate API Key**
   - Navigate to [API Keys page](https://platform.openai.com/api-keys)
   - Click "Create new secret key"
   - Give it a name (e.g., "CardCal Production")
   - **Important**: Copy the key immediately - you won't be able to see it again!
   - Save it securely (you'll need it for Vercel)

### OpenAI API Pricing

- **GPT-3.5-turbo**: ~$0.0015 per 1K input tokens, ~$0.002 per 1K output tokens
- **Typical usage**: Each commentary generation uses ~50-100 tokens
- **Cost per commentary**: ~$0.0001 - $0.0002 (very affordable)
- **Free tier**: $5 credit when you sign up

### Security Best Practices

⚠️ **Never commit your API key to Git!**
- Always use environment variables
- Use different keys for development and production
- Rotate keys if they're accidentally exposed
- Monitor usage in OpenAI dashboard

## Step 2: Prepare Your Repository

1. **Push to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Add Supabase integration"
   git push origin main
   ```

2. **Verify your code is ready**
   - All environment variables are referenced correctly
   - No hardcoded secrets in the code
   - `.env` file is in `.gitignore`

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Import Your Project**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Select the repository: `cardcal` (or your repo name)

2. **Configure Project Settings**
   - **Framework Preset**: Vite (should auto-detect)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `dist` (default)
   - **Install Command**: `npm install` (default)

3. **Add Environment Variables**
   
   Click "Environment Variables" and add the following:

   | Variable Name | Value | Description |
   |--------------|-------|-------------|
   | `VITE_OPENAI_API_KEY` | `sk-...` | Your OpenAI API key |
   | `VITE_PUBLIC_SUPABASE_URL` | `https://mvpsfokqjdustkmnfluj.supabase.co` | Your Supabase project URL |
   | `VITE_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGc...` | Your Supabase anon/public key |

   **Important Notes:**
   - Make sure to add these for **Production**, **Preview**, and **Development** environments
   - Click "Add" after each variable
   - Double-check for typos in variable names

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (usually 1-2 minutes)
   - Your app will be live at `https://your-project.vercel.app`

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Link to existing project? **No** (first time) or **Yes** (updates)
   - Project name: `cardcal` (or your choice)
   - Directory: `./`
   - Override settings? **No**

4. **Add Environment Variables via CLI**
   ```bash
   vercel env add VITE_OPENAI_API_KEY
   vercel env add VITE_PUBLIC_SUPABASE_URL
   vercel env add VITE_PUBLIC_SUPABASE_ANON_KEY
   ```
   
   For each variable:
   - Select environments: **Production**, **Preview**, **Development**
   - Enter the value when prompted

5. **Redeploy with Environment Variables**
   ```bash
   vercel --prod
   ```

## Step 4: Verify Deployment

1. **Check Build Logs**
   - Go to your project in Vercel dashboard
   - Click on the latest deployment
   - Check for any build errors

2. **Test Your Application**
   - Visit your deployed URL
   - Test the AI commentary feature (should work with OpenAI)
   - Make score changes (should save to Supabase)
   - Check browser console for any errors

3. **Verify Environment Variables**
   - Open browser DevTools → Console
   - Should NOT see "Supabase credentials not found" warning
   - AI commentary should generate successfully

## Step 5: Custom Domain (Optional)

1. **Add Domain in Vercel**
   - Go to your project → **Settings** → **Domains**
   - Enter your domain name
   - Follow DNS configuration instructions

2. **Update DNS Records**
   - Add CNAME or A record as instructed by Vercel
   - Wait for DNS propagation (can take up to 48 hours)

## Troubleshooting

### Build Fails

**Error: "Environment variable not found"**
- Solution: Make sure all environment variables are added in Vercel dashboard
- Redeploy after adding variables

**Error: "Module not found"**
- Solution: Check `package.json` has all dependencies
- Run `npm install` locally to verify

### Runtime Errors

**"Supabase credentials not found"**
- Check environment variable names match exactly
- Ensure `VITE_PUBLIC_` prefix is used
- Redeploy after fixing

**"OpenAI API error"**
- Verify API key is correct
- Check OpenAI account has credits
- Check API key has proper permissions

**"Failed to save game session"**
- Verify Supabase tables are created
- Check RLS policies allow public access
- Verify Supabase URL and key are correct

### Performance Issues

**Slow API responses**
- OpenAI API can take 1-3 seconds per request
- Consider adding loading states (already implemented)
- Monitor usage in OpenAI dashboard

**Build timeouts**
- Vercel free tier: 45 seconds build limit
- Optimize build: Remove unused dependencies
- Consider upgrading to Pro plan

## Environment Variables Reference

### Required Variables

```env
# OpenAI API Key (Required for AI features)
VITE_OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxx

# Supabase Configuration (Required for cloud sync)
VITE_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
VITE_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Optional Variables

```env
# Alternative Supabase variable names (also supported)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Cost Estimation

### Vercel
- **Free Tier**: 
  - 100GB bandwidth/month
  - Unlimited deployments
  - Perfect for personal projects
- **Pro Tier**: $20/month (if you need more)

### OpenAI
- **GPT-3.5-turbo**: ~$0.001-0.002 per commentary
- **1000 commentaries**: ~$1-2
- **Monthly estimate** (moderate use): $5-10

### Supabase
- **Free Tier**: 
  - 500MB database
  - 2GB bandwidth
  - Perfect for small projects
- **Pro Tier**: $25/month (if you need more)

**Total Estimated Cost**: $0-10/month (free tier) or $45-55/month (pro tier)

## Next Steps

1. ✅ Set up OpenAI API key
2. ✅ Deploy to Vercel
3. ✅ Configure environment variables
4. ✅ Test all features
5. 🎉 Share your app!

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Project Issues](https://github.com/bdsahin365/cardcal/issues)

---

**Need Help?** Check the troubleshooting section or open an issue on GitHub!

