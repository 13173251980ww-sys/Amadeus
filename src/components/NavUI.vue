<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  House,
  Document,
  Setting,
  Lock,
  User,
  Notification
} from '@element-plus/icons-vue'

const router = useRouter()
const activeIndex = ref('1')

const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>

<template>
  <div class="nav-container">
    <h3 class="nav-title">Dark Gold Menu Demo</h3>
    
    <!-- Vertical Menu -->
    <div class="menu-section">
      <h4 class="section-title">Vertical Menu</h4>
      <el-menu
        :default-active="activeIndex"
        class="demo-menu-vertical"
        @select="handleSelect"
      >
        <el-menu-item index="1">
          <el-icon><House /></el-icon>
          <span>Dashboard</span>
        </el-menu-item>
        
        <el-sub-menu index="2">
          <template #title>
            <el-icon><Document /></el-icon>
            <span>Content</span>
          </template>
          <el-menu-item index="2-1">Articles</el-menu-item>
          <el-menu-item index="2-2">Pages</el-menu-item>
          <el-menu-item index="2-3">Media</el-menu-item>
        </el-sub-menu>
        
        <el-menu-item index="3">
          <el-icon><Setting /></el-icon>
          <span>Settings</span>
        </el-menu-item>
        
        <el-menu-item index="4" disabled>
          <el-icon><Lock /></el-icon>
          <span>Disabled Item</span>
        </el-menu-item>
        
        <el-sub-menu index="5">
          <template #title>
            <el-icon><User /></el-icon>
            <span>User Management</span>
          </template>
          <el-menu-item-group title="User Actions">
            <el-menu-item index="5-1">Create User</el-menu-item>
            <el-menu-item index="5-2">User List</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Permissions">
            <el-menu-item index="5-3">Roles</el-menu-item>
            <el-menu-item index="5-4">Access Control</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        
        <el-menu-item index="6">
          <el-icon><Notification /></el-icon>
          <span>Notifications</span>
        </el-menu-item>
      </el-menu>
    </div>

    <!-- Horizontal Menu -->
    <div class="menu-section">
      <h4 class="section-title">Horizontal Menu</h4>
      <el-menu
        :default-active="activeIndex"
        class="demo-menu-horizontal"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">
          <el-icon><House /></el-icon>
          <span>Home</span>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon><Document /></el-icon>
          <span>Content</span>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon><Setting /></el-icon>
          <span>Settings</span>
        </el-menu-item>
        <el-menu-item index="4" disabled>
          <el-icon><Lock /></el-icon>
          <span>Disabled</span>
        </el-menu-item>
      </el-menu>
    </div>
    
    <div class="demo-info">
      <p>✨ Features demonstrated:</p>
      <ul>
        <li>Dark gold color scheme on black background</li>
        <li>Hover effects with gradient and glow</li>
        <li>Active state with gold highlighting</li>
        <li>Focus states for accessibility</li>
        <li>Disabled state styling</li>
        <li>Submenu support with proper nesting</li>
        <li>Icon integration with color transitions</li>
        <li>Both vertical and horizontal layouts</li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/var.scss";

.nav-container {
  min-height: 100vh;
  background-color: $bg-color-page;
  padding: 32px;
}

.nav-title {
  color: $color-primary-light;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 32px;
  text-align: center;
  text-shadow: 0 0 20px rgba(230, 200, 122, 0.3);
}

.menu-section {
  margin-bottom: 48px;
}

.section-title {
  color: $text-color-primary;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid rgba(201, 162, 77, 0.2);
}

.demo-menu-vertical {
  max-width: 300px;
  border-radius: 8px;
  overflow: hidden;
}

.demo-menu-horizontal {
  border-radius: 8px;
  overflow: hidden;
}

.demo-info {
  margin-top: 48px;
  padding: 24px;
  background-color: rgba(28, 28, 28, 0.6);
  border: 1px solid rgba(201, 162, 77, 0.2);
  border-radius: 8px;
  color: $text-color-regular;
  
  p {
    color: $color-primary-light;
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 12px;
  }
  
  ul {
    list-style: none;
    padding-left: 0;
    
    li {
      padding: 6px 0;
      padding-left: 24px;
      position: relative;
      
      &::before {
        content: '▸';
        position: absolute;
        left: 0;
        color: $color-primary;
      }
    }
  }
}
</style>
