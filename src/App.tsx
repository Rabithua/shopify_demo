import {
  Card,
  Layout,
  Page,
  BlockStack,
  Tabs,
  TextField,
  IndexTable,
  useIndexResourceState,
  Button,
  Popover,
  ActionList,
  Text,
  Tooltip,
  Pagination,
  DatePicker,
} from "@shopify/polaris";
import { useCallback, useState } from "react";
import "./manageReview.styles.css";

export default function AdditionalPage() {
  const [selected, setSelected] = useState(0);
  const [popoverActive, setPopoverActive] = useState(false);
  const handleTabChange = useCallback(
    (selectedTabIndex: number) => setSelected(selectedTabIndex),
    []
  );
  const tabs = [
    {
      id: "all-reviews-1",
      content: "All",
      badge: "168",
      accessibilityLabel: "All Reviews",
    },
    {
      id: "published-reviews-1",
      content: "Published",
      badge: "150",
      accessibilityLabel: "Published",
    },
    {
      id: "hidden-reviews-1",
      content: "Hidden",
      badge: "21",
      accessibilityLabel: "Hidden",
    },
  ];
  // 评论数据
  const reviewData = [
    {
      id: "1020",
      product: "Bucket",
      reviewId: "1",
      reviewContent:
        "Pretty good product, great experience,Easy to set up, the first experience so I didn't add particularly much ice and the experience was great. Great value for money for the price as well",
      click: 233,
      totalOrder: 123,
      abandonOrder: 43,
      lossingOrder: 13,
    },
  ];

  const resourceName = {
    singular: "review",
    plural: "reviewData",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(reviewData);

  const rowMarkup = reviewData.map(
    (
      {
        id,
        product,
        reviewId,
        reviewContent,
        click,
        totalOrder,
        abandonOrder,
        lossingOrder,
      },
      index
    ) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <div className="tableCellContent">
            <span style={{ marginRight: "10px" }}> {product}</span>
            <Button
              variant="plain"
              onClick={() => {
                console.log("跳转商品页面");
              }}
            >
              View
            </Button>
          </div>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <div className="tableCellContent">{reviewId}</div>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <div className="tableCellContent">{reviewContent}</div>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <div className="tableCellContent">{click}</div>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <div className="tableCellContent">{totalOrder}</div>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <div className="tableCellContent">{abandonOrder}</div>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <div className="tableCellContent">{lossingOrder}</div>
        </IndexTable.Cell>
      </IndexTable.Row>
    )
  );

  // 日期筛选
  const [selectedDates, setSelectedDates] = useState({
    start: new Date(),
    end: new Date(),
  });
  const [{ month, year }, setDate] = useState({
    month: selectedDates.start.getMonth(),
    year: selectedDates.start.getFullYear(),
  });

  const handleMonthChange = useCallback(
    (month: number, year: number) => setDate({ month, year }),
    []
  );

  function dateChange(e: any) {
    setSelectedDates(e);
    console.log("日期筛选改变");
  }

  function DateFilter() {
    return (
      <DatePicker
        month={month}
        year={year}
        onChange={dateChange}
        onMonthChange={handleMonthChange}
        selected={selectedDates}
        allowRange
      />
    );
  }

  const myContent: React.ReactNode = (
    <div style={{ display: "flex", height: "30px" }}>
      <ProductTabList></ProductTabList>
    </div>
  );

  function ProductTabList() {
    const [active, setActive] = useState(false);

    const toggleActive = useCallback(() => setActive((active) => !active), []);

    const handleImportedAction = useCallback(
      () => console.log("Imported action"),
      []
    );

    const handleExportedAction = useCallback(
      () => console.log("Exported action"),
      []
    );

    const activator = (
      <Button onClick={toggleActive} disclosure>
        All Product
      </Button>
    );

    return (
      <div style={{ height: "250px" }}>
        <Popover
          active={active}
          activator={activator}
          autofocusTarget="first-node"
          onClose={toggleActive}
        >
          <ActionList
            actionRole="menuitem"
            items={[
              {
                content: "Product",
                onAction: handleImportedAction,
              },
              {
                content: "Product",
                onAction: handleExportedAction,
              },
            ]}
          />
        </Popover>
      </div>
    );
  }

  // 分页器
  function ReviewTalbePagination() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "30px",
        }}
      >
        <Pagination
          label="Showing 1 to 25 of 37 results"
          hasPrevious
          onPrevious={() => {
            console.log("Previous");
          }}
          hasNext
          onNext={() => {
            console.log("Next");
          }}
        />
      </div>
    );
  }

  // 顶部小卡片数据
  let statisticsData = [
    {
      type: "Click",
      value: 200,
    },
    {
      type: "Order Attribution",
      value: 93,
    },
    {
      type: "Abandon Order Attribution",
      value: 7,
    },
    {
      type: "Lossing Attribution",
      value: 100,
    },
  ];

  return (
    <Page title="Manage Reviews">
      <Layout>
        <Layout.Section>
          <Text variant="headingMd" as="h2">
            Statistics
          </Text>
          <div className="dataTopShow">
            {statisticsData.map((item, index) => {
              return (
                <div className="data" key={`dataTop_${index}`}>
                  <div className="num">{item.value}</div>
                  <div className="type">{item.type}</div>
                </div>
              );
            })}
          </div>
          <Card padding="0">
            <BlockStack gap="300">
              <div className="flex">
                <Tabs
                  tabs={tabs}
                  selected={selected}
                  onSelect={handleTabChange}
                ></Tabs>
                <div style={{ marginLeft: "auto" }}></div>
                <Popover
                  active={popoverActive}
                  activator={
                    <Button
                      onClick={() => {
                        setPopoverActive(!popoverActive);
                      }}
                      variant="primary"
                    >
                      Date Filter
                    </Button>
                  }
                  onClose={() => {
                    console.log("关闭日期筛选器事件");
                  }}
                  ariaHaspopup={false}
                  sectioned
                  preventCloseOnChildOverlayClick={false}
                >
                  {popoverActive ? DateFilter() : ""}
                </Popover>

                {/* <div>
                  {selectedDates.start.toLocaleString("en-US", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}{" "}
                  -{" "}
                  {selectedDates.end.toLocaleString("en-US", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </div> */}

                <TextField
                  label=""
                  type="text"
                  onChange={(e: any) => {
                    console.log(e);
                  }}
                  prefix=""
                  placeholder="Filter"
                  autoComplete="off"
                />
              </div>
            </BlockStack>
            <IndexTable
              resourceName={resourceName}
              itemCount={reviewData.length}
              selectedItemsCount={
                allResourcesSelected ? "All" : selectedResources.length
              }
              onSelectionChange={handleSelectionChange}
              headings={[
                { title: myContent, id: "" },
                { title: "ReviewID" },
                { title: "Review Content" },
                { title: "Click " },
                { title: "Total Order" },
                { title: "Abandon Order" },
                { title: "Lossing Order" },
              ]}
            >
              {rowMarkup}
            </IndexTable>
            {ReviewTalbePagination()}
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
