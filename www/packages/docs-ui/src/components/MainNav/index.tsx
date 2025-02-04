"use client"

import clsx from "clsx"
import React from "react"
import {
  BorderedIcon,
  Button,
  LinkButton,
  SearchModalOpener,
  useLayout,
  useMainNav,
  useSidebar,
  useSiteConfig,
} from "../.."
import { MainNavEditDate } from "./EditDate"
import { MainNavItems } from "./Items"
import { MainNavDesktopMenu } from "./DesktopMenu"
import { SidebarLeftIcon } from "../Icons/SidebarLeft"
import { MainNavMobileMenu } from "./MobileMenu"
import Link from "next/link"
import { MainNavVersion } from "./Version"
import { AiAssistantTriggerButton } from "../AiAssistant/TriggerButton"

type MainNavProps = {
  className?: string
  itemsClassName?: string
}

export const MainNav = ({ className, itemsClassName }: MainNavProps) => {
  const { editDate } = useMainNav()
  const { setMobileSidebarOpen, isSidebarShown } = useSidebar()
  const { config } = useSiteConfig()
  const { showCollapsedNavbar } = useLayout()

  return (
    <div
      className={clsx("w-full z-20 sticky top-0 bg-medusa-bg-base", className)}
    >
      <div
        className={clsx(
          "flex justify-between items-center px-docs_1 w-full gap-docs_1",
          showCollapsedNavbar && "border-b border-medusa-border-base"
        )}
      >
        <div className="flex items-center gap-[10px]">
          {isSidebarShown && (
            <Button
              className="lg:hidden my-docs_0.75 !p-[6.5px]"
              variant="transparent-clear"
              onClick={() => setMobileSidebarOpen(true)}
            >
              <SidebarLeftIcon />
            </Button>
          )}
          <Link href={`${config.baseUrl}`}>
            <BorderedIcon
              icon={config.logo}
              iconWrapperClassName="my-[14px]"
              wrapperClassName="w-[20px] h-[20px]"
              iconWidth={20}
              iconHeight={20}
            />
          </Link>
        </div>
        {!showCollapsedNavbar && (
          <MainNavItems className={clsx("flex-grow", itemsClassName)} />
        )}
        <div
          className={clsx(
            "flex items-center gap-docs_0.75 my-docs_0.75",
            showCollapsedNavbar && "flex-grow justify-between"
          )}
        >
          <div className="lg:flex items-center gap-docs_0.5 text-medusa-fg-subtle hidden">
            <MainNavVersion />
            {editDate && <MainNavEditDate date={editDate} />}
            <LinkButton
              href={config.reportIssueLink || ""}
              variant="subtle"
              target="_blank"
              className="text-compact-small-plus"
            >
              Report Issue
            </LinkButton>
          </div>
          <div className="flex items-center gap-docs_0.25">
            <AiAssistantTriggerButton />
            <SearchModalOpener />
            <MainNavDesktopMenu />
            <MainNavMobileMenu />
          </div>
        </div>
      </div>
      {showCollapsedNavbar && (
        <div className={clsx("border-b border-medusa-border-base px-docs_1")}>
          <MainNavItems className={clsx("flex-wrap", itemsClassName)} />
        </div>
      )}
    </div>
  )
}
