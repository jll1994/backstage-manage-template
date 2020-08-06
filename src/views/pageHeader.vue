<template>
    <div>
        <pageHeader title="pageHeader"></pageHeader>
        <pageHeader title="pageHeader" subtitle="this is a subtitle" :isBack="false"></pageHeader>
        <pageHeader title="title" subtitle="this is a subtitle" backUrl="/">
            <template slot="extra">
                <Button>default</Button>
                <Button type="primary">primary</Button>
            </template>
        </pageHeader>
        <pageHeader title="title" subtitle="this is a subtitle" :backUrl="-2">
            <descriptions :column="3">
                <descriptionsItem label="UserName">Zhou Maomao</descriptionsItem>
                <descriptionsItem label="Telephone">1810000000</descriptionsItem>
                <descriptionsItem label="Live">Hangzhou, Zhejiang</descriptionsItem>
                <descriptionsItem label="Remark">empty</descriptionsItem>
                <descriptionsItem label="Address" :span="2">No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China</descriptionsItem>
            </descriptions>
        </pageHeader>
    </div>
</template>
