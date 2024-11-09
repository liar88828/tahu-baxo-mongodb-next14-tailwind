'use client'
import { Icon } from "@iconify/react";
import React from "react";

export function IconMore() {
  return (
    <Icon icon='ic:more-horiz'
          className='size-5'
    />
  );
}
export function IconMenu() {
  return (
    <Icon icon='mdi:menu'
          className='size-5'
    />
  );
}

export function IconPerson() {
	return (
		<Icon icon="mdi:person-outline"
					className='size-6'
		/>
	);
}
export function IconBack() {
  return (
    <Icon
      icon='ic:round-arrow-back'
      className='size-5'
    />
  );
}

export function IconSearch() {
  return (
    <Icon
      icon='ic:round-search'
      className='size-5'
    />
  );
}

export function IconDelete() {
  return (
    <Icon
      icon='ic:round-delete'
      className='size-5'
    />
  );
}

export function IconRemove({ className }: { className?: string }) {
  return (
    <Icon
      icon='ic:round-remove'
			className={ `size-5 ${ className }` }
    />
  );
}

export function IconAdd({ className }: { className?: string }) {
  return (
    <Icon
      icon='ic:round-add'
			className={ `size-5 ${ className }` }
    />
  );
}
export function IconEdit() {
  return (
    <Icon icon='material-symbols:edit'
          className='size-5'
    />
  );
}

export function IconFavorite() {
  return (
    <Icon icon={'mdi:favorite'}
          className={'size-5'}
    />
  );
}
export function IconBell() {
  return (
    <Icon icon={'mdi:bell-outline'}
          className={'size-5'}
    />
  );
}
export function IconFilter() {
  return (
    <Icon icon={'mdi:filter-outline'}
          className={'size-5'}
    />
  );
}

export function IconTrolley() {
  return (
    <Icon icon={ 'mdi:trolley-outline' }
          className={ 'size-5' }
    />
  );
}

export function IconWarning({ className }: { className?: string }) {
	return (
		<Icon icon="mdi:warning-outline" className={ `size-8 ${ className }` }/>
	);
}

export function IconHome({ className }: { className?: string }) {
	return (
		<Icon icon="mdi:home-outline" className={ `size-8 ${ className }` }/>
	);
}

export function IconDetail({ className }: { className?: string }) {
	return (
		<Icon icon="mdi:note-text-outline" className={ 'size-5' }/>
	);
}

export function IconLocation({ className }: { className?: string }) {
	return (
		<Icon icon="mdi:location-on-outline" className={ 'size-5' }/>
	);
}

export function IconMoney({ className }: { className?: string }) {
	return (
		<Icon icon="mdi:attach-money" className={ 'size-5' }/>
	);
}

export function IconBox({ className }: { className?: string }) {
	return (
		<Icon icon="solar:box-linear" className={ `size-6/10 ${ className }` }/>
	);
}

export function IconTruck({ className }: { className?: string }) {
	return (
		<Icon icon="mdi:truck-outline" className={ `~size-6/10 ${ className }` }/>
	);
}

export function IconX({ className }: { className?: string }) {
	return (
		<Icon icon="streamline:delete-1" className={ `~size-6/10 ${ className }` }/>
	);
}

