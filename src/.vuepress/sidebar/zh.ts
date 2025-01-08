import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  // "/": [
  //   // "" /* 主页 */, 
  //   {
  //     text: "攻略",
  //     icon: "fas fa-lightbulb",
  //     prefix: "guide/",
  //     children: "structure",      
  //   }, 
  // ], 

  // 攻略
  "/guide/": [
    {
      text: "攻略", 
      icon: "fas fa-lightbulb", 
      children: "structure",    
    }, 
  ], 

  // 高中生物笔记侧边栏
  "/bioone/": [
    // "" /* /bioone/ */, 
    {
      text: "必修1分子与细胞", 
      icon: "book", 
      children: "structure",    
    }, 
  ], 

  "/biotwo/": [
    {
      text: "必修2遗传与进化", 
      icon: "book", 
      children: "structure",    
    }, 
  ], 

  "/bioxone/": [
    {
      text: "选必1稳态与调节", 
      icon: "book", 
      children: "structure",    
    }, 
  ], 

  "/bioxtwo/": [
    {
      text: "选必2生物与环境", 
      icon: "book", 
      children: "structure",    
    }, 
  ], 

  "/bioxtre/": [
    {
      text: "选必3生物技术与工程", 
      icon: "book", 
      children: "structure",    
    }, 
  ], 
  
  // 高中生物真题
  "/bioexam24/": [
    {
      text: "2024年", 
      icon: "book", 
      children: "structure",    
    }, 
  ], 

  // Windows 软件
  "/software/": [
    {
      text: "Windows 软件", 
      icon: "fas fa-desktop", 
      children: "structure",    
    }, 
  ], 

  // Android 软件
  "/apps/": [
    {
      text: "Android 软件", 
      icon: "fas fa-mobile-screen", 
      children: "structure",    
    }, 
  ], 
  
  // Office 365
  "/365/": [
    {
      text: "Microsoft 365", 
      icon: "fab fa-microsoft", 
      children: "structure",    
    }, 
  ], 

  // Windows 系统
  "/windows/": [
    {
      text: "Microsoft 365", 
      icon: "fab fa-windows", 
      children: "structure",    
    }, 
  ], 

  // 建站 
  "/website/": "structure",
  
  
});
