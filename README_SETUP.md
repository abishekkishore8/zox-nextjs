# Zox Next.js - Complete Setup Guide

## 🚀 Quick Start

### 1. Prerequisites
- Docker Desktop installed and running
- Node.js 20+ installed
- npm package manager

### 2. Setup Steps

```bash
# 1. Install dependencies
npm install

# 2. Start Docker services
npm run docker:up

# 3. Create environment file
npm run env:create

# 4. Initialize database
npm run db:migrate

# 5. Seed database (migrate data from data.ts)
npm run db:seed

# 6. Start development server
npm run dev
```

### 3. Access Points

- **Application:** http://localhost:3000
- **API:** http://localhost:3000/api
- **Adminer (DB UI):** http://localhost:8080
- **Redis Commander:** http://localhost:8081

**Note:** Redis runs on port **6382** (instead of default 6379) to avoid conflicts with other Redis instances.

---

## 🔐 Admin Credentials

After running `npm run db:seed`:

**Email:** `admin@startupnews.fyi`  
**Password:** `Admin@123!`

**⚠️ Change these in production!**

---

## 📊 What Was Migrated

- ✅ **473 Posts** - All posts from `src/lib/data.ts`
- ✅ **44 Events** - All startup events
- ✅ **40 Categories** - Post categories and event locations
- ✅ **1 Admin User** - Ready for admin panel access

---

## 📝 Available Commands

```bash
# Environment
npm run env:create          # Create .env.local file

# Database
npm run db:migrate          # Create database tables
npm run db:seed             # Migrate data from data.ts
npm run db:reset            # Reset database completely

# Docker
npm run docker:up           # Start Docker services
npm run docker:down         # Stop Docker services
npm run docker:logs         # View Docker logs
npm run docker:test         # Test Docker connections
npm run docker:status       # Check container status

# Development
npm run dev                 # Start Next.js dev server
npm run build               # Build for production
npm run start               # Start production server
```

---

## 🔍 Verification

### Check Database
```bash
# Test connections
npm run docker:test

# Check data counts
docker exec zox-mariadb mariadb -uzox_user -pzox_password zox_db -e "
  SELECT 'Posts' as type, COUNT(*) as count FROM posts
  UNION ALL SELECT 'Events', COUNT(*) FROM events
  UNION ALL SELECT 'Categories', COUNT(*) FROM categories;
"
```

### Test API
```bash
# Health check
curl http://localhost:3000/api/health

# Get posts
curl http://localhost:3000/api/posts?limit=5

# Get categories
curl http://localhost:3000/api/categories
```

---

## 📚 Documentation

- **Environment Setup:** `ENVIRONMENT_SETUP.md`
- **Migration Summary:** `DATABASE_MIGRATION_SUMMARY.md`
- **Docker Analysis:** `DOCKER_SETUP_ANALYSIS.md`
- **Implementation Complete:** `IMPLEMENTATION_COMPLETE.md`

---

## ✅ Setup Complete!

Your application is now ready with:
- ✅ All environment variables configured
- ✅ Database initialized and seeded
- ✅ Admin user created
- ✅ All data from `data.ts` migrated
- ✅ Ready for admin panel management

**Start developing:** `npm run dev`

