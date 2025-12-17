# 📄 Google Drive Resume Setup Guide

## 🔗 Your Google Drive Resume Link
**Original Link**: https://drive.google.com/file/d/1CH06-cEDdE4jjTdyRLq3ZpeMmOJz9oUP/view?usp=drive_link
**Direct Download Link**: https://drive.google.com/uc?export=download&id=1CH06-cEDdE4jjTdyRLq3ZpeMmOJz9oUP

## ⚠️ IMPORTANT: Make Your Resume Publicly Accessible

Your current Google Drive link requires sign-in. To make it work for everyone:

### Step 1: Make File Public
1. Go to your Google Drive
2. Right-click on your resume PDF
3. Select "Share" or "Get link"
4. Change permissions to **"Anyone with the link can view"**
5. Copy the new shareable link

### Step 2: Verify Public Access
Test the link in an incognito/private browser window to ensure it works without sign-in.

## 🔄 Link Format Conversion

### View Link Format:
```
https://drive.google.com/file/d/FILE_ID/view?usp=sharing
```

### Direct Download Link Format:
```
https://drive.google.com/uc?export=download&id=FILE_ID
```

### Your File ID: 
`1CH06-cEDdE4jjTdyRLq3ZpeMmOJz9oUP`

## 💻 Updated Implementation

The portfolio now uses JavaScript to handle the Google Drive download:

```javascript
const handleDownloadResume = () => {
  const driveDownloadUrl = "https://drive.google.com/uc?export=download&id=1CH06-cEDdE4jjTdyRLq3ZpeMmOJz9oUP"
  window.open(driveDownloadUrl, "_blank", "noopener,noreferrer")
}
```

## ✅ Benefits of Google Drive Hosting

1. **Easy Updates**: Update your resume anytime without redeploying
2. **Version Control**: Google Drive keeps version history
3. **Analytics**: Track downloads through Google Drive
4. **Reliability**: Google's infrastructure ensures high availability

## 🧪 Testing Checklist

- [ ] File is publicly accessible (test in incognito mode)
- [ ] Direct download link works
- [ ] Button triggers download correctly
- [ ] Works on mobile devices
- [ ] No sign-in required for visitors

## 🔧 Alternative Options

If you prefer local hosting:
1. Keep the PDF in `/public/resume.pdf`
2. Use the original anchor tag method
3. Update the file whenever needed and redeploy

## 📱 Mobile Compatibility

The Google Drive download works on:
- ✅ Desktop browsers
- ✅ Mobile browsers
- ✅ iOS Safari
- ✅ Android Chrome

---

**Next Steps:**
1. Make your Google Drive file public
2. Test the download button
3. Verify it works in different browsers
