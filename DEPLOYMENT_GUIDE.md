# 🚀 Deployment Guide

## Backend Deployment (Vercel)

1. **Deploy Backend to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Click "New Project"
   - Import the `showmax-stream` repository
   - Select the `backend` folder as root directory
   - Set environment variables:
     ```
     DB_HOST=your_database_host
     DB_PORT=your_database_port
     DB_NAME=your_database_name
     DB_USER=your_database_user
     DB_PASSWORD=your_database_password
     DB_SSL=require
     JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
     JWT_EXPIRE=7d
     PORT=5000
     NODE_ENV=production
     ```
   - Deploy

2. **Update Backend URL**
   - After deployment, note the backend URL (e.g., `https://showmaxx-backend.vercel.app`)
   - Update `frontend/.env.production` with the correct URL

## Frontend Deployment (Netlify)

1. **Configure Netlify Environment Variables**
   - Go to your Netlify site settings
   - Add environment variables:
     ```
     REACT_APP_API_URL=https://showmaxx-backend.vercel.app/api
     REACT_APP_TMDB_API_KEY=your_tmdb_api_key
     ```

2. **Redeploy Frontend**
   - Trigger a new deployment on Netlify
   - The frontend will now connect to the deployed backend

## Alternative: Full Stack on Vercel

If you want everything on one platform, use the root `vercel.json` configuration:

1. Delete the backend-specific `vercel.json`
2. Use the root `vercel.json` for full-stack deployment
3. Set all environment variables in Vercel project settings

## Troubleshooting

- **CORS Issues**: Ensure backend allows frontend origin
- **Database Connection**: Verify database is running and accessible
- **Environment Variables**: Double-check all secrets are correctly set
- **API Routes**: Ensure `/api/*` routes are properly configured
