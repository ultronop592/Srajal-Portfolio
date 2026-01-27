# Srajal Tiwari - Portfolio Website

A modern, responsive portfolio website built with Next.js, React, and Tailwind CSS.

## 🚀 Features

- **Responsive Design** - Works perfectly on all devices
- **Dark Mode Toggle** - Switch between light and dark themes
- **Resume Download** - Direct PDF download functionality
- **Interactive UI** - Smooth animations and hover effects
- **Contact Form** - Get in touch section
- **Project Showcase** - Display of ML/AI projects
- **Certifications** - Professional certifications display

## 📁 Project Structure

\`\`\`
your-portfolio/
├── public/
│   ├── resume.pdf               ⬅️ Your actual resume PDF
│   ├── profile.jpg              ⬅️ Your profile image
│   └── resume-image.png         ⬅️ Resume screenshot
├── app/
│   ├── page.tsx                 ⬅️ Main homepage (Next.js App Router)
│   ├── layout.tsx               ⬅️ Root layout
│   └── globals.css              ⬅️ Global styles
├── components/
│   └── ui/                      ⬅️ shadcn/ui components
├── lib/
│   └── utils.ts                 ⬅️ Utility functions
├── package.json
├── tailwind.config.ts           ⬅️ Tailwind CSS configuration
├── next.config.mjs              ⬅️ Next.js configuration
└── README.md
\`\`\`

## 🛠️ Technologies Used

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Lucide React** - Icons

## 📋 Resume Download

The resume download functionality:
- **File Location**: `/public/resume.pdf`
- **Download URL**: `/resume.pdf`
- **Features**: Opens in new tab + triggers download
- **Filename**: `Srajal_Tiwari_Resume.pdf`

## 🎨 Customization

### Adding Your Resume
1. Place your PDF file in `/public/resume.pdf`
2. The download button will automatically work

### Updating Profile Image
1. Add your image to `/public/profile.jpg`
2. Update the src in the hero section

### Modifying Content
- **Personal Info**: Update in `app/page.tsx`
- **Projects**: Modify the `projects` array
- **Skills**: Update the `skills` object
- **Certifications**: Edit the `certifications` array

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Deploy automatically

### Other Platforms
- **Netlify**: Drag and drop build folder
- **GitHub Pages**: Use `next export` for static export
- **Railway/Render**: Connect GitHub repository

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎯 Performance Features

- **Image Optimization** - Next.js automatic optimization
- **Code Splitting** - Automatic with Next.js
- **SEO Friendly** - Meta tags and semantic HTML
- **Fast Loading** - Optimized bundle size

## 📞 Contact Information

- **Email**: srajaltiwari902@gmail.com
- **Phone**: +91 9919084211
- **Location**: Lucknow, India
- **LinkedIn**: [Profile Link](https://linkedin.com/in/srajal-tiwari-7229172b9)
- **GitHub**: [Profile Link](https://github.com/ultronop592)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ by Srajal Tiwari
