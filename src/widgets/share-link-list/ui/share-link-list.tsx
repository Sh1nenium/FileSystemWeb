import styles from "./shareLinkList.module.scss"
import _ from "lodash"
import { ShareLink, ShareRights } from "@/entities/explorer-object/model/types";
import { ShareLinkItemPanel } from "@/entities/share-links/ui/share-link-item-panel";

export function ShareLinkList({
  objectId,
  className
} : {
  objectId: string;
  className: string;
}) {

  const links: ShareLink[] = [
    {
      id: "ваппваппваппваппваппваппваппваппваппваппваппваппваппваппваппваппваппваппваппвапп",
      daysToExpire: 7,
      rights: ShareRights.Read | ShareRights.Write, 
    },
    {
      id: "2",
      daysToExpire: 14,
      rights: ShareRights.Read | ShareRights.Delete | ShareRights.Write,
    },
    {
      id: "3",
      daysToExpire: 30,
      rights: ShareRights.Read, 
    },
    {
      id: "4",
      daysToExpire: 1,
      rights: ShareRights.Write | ShareRights.Delete, 
    },
    {
      id: "5",
      daysToExpire: 365,
      rights: ShareRights.None,
    },
  ];
  
  console.log(links);

  const handleDelete = (id: string) => {
    console.log('Delete link:', id);
  };

  const handleEdit = (id: string) => {
    console.log('Edit link:', id);
  };

  return (
    <div className={`${styles['share-link-list']} ${className}`}>
      {links.map(link => (
        <ShareLinkItemPanel
          key={link.id}
          shareLink={link}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}