'use client'

import React, { useState, useEffect } from 'react'
import { POSTS_PER_PAGE } from '@/data/postsPerPage'
import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { allBlogs } from 'contentlayer/generated'

import { LocaleTypes } from 'app/[locale]/i18n/settings'

type TagsProps = {
  params: { tag: string; locale: LocaleTypes }
}

export default function ClientTagPage({ params: { tag, locale } }: TagsProps) {
  const dtag = decodeURI(tag)
  const [numPostsToShow, setNumPostsToShow] = useState(POSTS_PER_PAGE)
  const [loading, setLoading] = useState(false)

  const title = dtag[0].toUpperCase() + dtag.split(' ').join('-').slice(1)

  const filteredPosts = allCoreContent(
    sortPosts(
      allBlogs.filter((post) => {
        return post.language === locale
      })
    ).filter((post) => {
      return post.tags && post.tags.map((t) => slug(t)).includes(dtag)
    })
  )

  const loadMorePosts = () => {
    setLoading(true)
    // Simulate loading more posts
    setTimeout(() => {
      setNumPostsToShow((prevNum) => prevNum + POSTS_PER_PAGE)
      setLoading(false)
    }, 100)
  }

  useEffect(() => {
    const handleScroll = () => {
      const { innerHeight } = window

      // Check if user has scrolled to the bottom with a small threshold
      if (
        innerHeight &&
        document.documentElement &&
        document.documentElement.scrollHeight - innerHeight <=
          document.documentElement.scrollTop + 10 &&
        !loading
      ) {
        loadMorePosts()
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [loading])

  return (
    <ListLayout
      posts={filteredPosts.slice(0, numPostsToShow)}
      title={title}
      params={{ locale: locale }}
    />
  )
}
